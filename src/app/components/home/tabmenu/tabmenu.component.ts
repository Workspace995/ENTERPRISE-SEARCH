
  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { MenuService } from 'src/app/services/menu.service';
  import { Subscription } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { HttpServiceService } from 'src/app/services/http-service.service';

  // Import Bootstrap types
  import * as bootstrap from 'bootstrap';

  @Component({
    selector: 'app-tabmenu',
    templateUrl: './tabmenu.component.html',
    styleUrls: ['./tabmenu.component.css'],
  })
  export class TabmenuComponent implements OnInit, OnDestroy {
    sourcesMenu: Array<{ name: string; label: string }> = [];
    dropdownItems: Array<{ sourceName: string; labelName: string }> = [];
    visibleSources: Set<string> = new Set();
    newItem: { name: string; label: string } = { name: '', label: '' };
    selectedSource: string = '';
    displayData: any[] = []; // Data to be displayed
    updateForm: FormGroup;
    currentUser: any;
    activeTab: string = 'ALL';

    private menuItemsSubscription: Subscription | null = null;

    // Data for edit modal
    editItemData: {
      sourceName: string;
      labelName: string;
      updated_sourceName: string;
      updated_labelName: string;
      updated_created_by: string;
      updated_created_time: string;
    } = {
      sourceName: '',
      labelName: '',
      updated_sourceName: '',
      updated_labelName: '',
      updated_created_by: '',
      updated_created_time: '',
    };

    // Current item to be deleted
    currentItemToDelete: { sourceName: string; labelName: string } | null = null;

    constructor(
      private menuService: MenuService,
      private modalService: NgbModal,
      private formBuilder: FormBuilder,
      private httpService: HttpServiceService
    ) {
      // Define all form controls in the FormGroup
      this.updateForm = this.formBuilder.group({
        sourceName: ['', Validators.required],
        labelName: ['', Validators.required],
        updated_sourceName: ['', Validators.required],
        updated_labelName: ['', Validators.required],
        updated_created_by: ['', Validators.required],
        updated_created_time: ['', Validators.required],
      });
    }

    ngOnInit(): void {
      const user = localStorage.getItem('user');
      if (user) {
        this.currentUser = JSON.parse(user);
      }
      this.loadSourcesMenu();
      this.loadVisibleSources();
      this.fetchDropdownItems();
      const dropdownElement = document.getElementById('navbarDropdown');
      if (dropdownElement) {
        new bootstrap.Dropdown(dropdownElement);
      }
    }

    ngOnDestroy(): void {
      if (this.menuItemsSubscription) {
        this.menuItemsSubscription.unsubscribe();
      }
    }

    fetchDropdownItems(): void {
      this.menuService.getDataSources().subscribe(
        (response: Array<{ sourceName: string; labelName: string }>) => {
          console.log('Full API Response:', response);

          if (Array.isArray(response)) {
            this.dropdownItems = response.filter(
              (item) => item.sourceName && item.labelName
            );
            console.log('Filtered Dropdown Items:', this.dropdownItems);
          } else {
            console.error('Invalid response structure:', response);
            this.dropdownItems = [];
          }
        },
        (error) => {
          console.error('Error fetching dropdown items:', error);
        }
      );
    }

    toggleVisibility(sourceName: string, labelName: string): void {
      if (this.visibleSources.has(sourceName)) {
        this.visibleSources.delete(sourceName);
        this.sourcesMenu = this.sourcesMenu.filter(
          (item) => item.name !== sourceName
        );
      } else {
        this.visibleSources.add(sourceName);
        this.sourcesMenu.push({ name: sourceName, label: labelName });
      }
      this.saveVisibleSources();
      this.saveSourcesMenu();
      this.closeDropdown();
    }

    isVisible(sourceName: string): boolean {
      return this.visibleSources.has(sourceName);
    }

    saveVisibleSources(): void {
      localStorage.setItem(
        'visibleSources',
        JSON.stringify([...this.visibleSources])
      );
    }

    loadVisibleSources(): void {
      const storedSources = localStorage.getItem('visibleSources');
      if (storedSources) {
        this.visibleSources = new Set(JSON.parse(storedSources));
      }
    }

    addNewItem(): void {
      if (this.newItem.name && this.newItem.label) {
        this.menuService
          .addDataSource(
            this.newItem.name,
            this.newItem.label,
            this.currentUser.username
          )
          .subscribe((response) => {
            if (response.error) {
              alert('Failed to add item');
            } else {
              alert('Item added successfully!');
              this.menuService.addMenuItem({
                name: this.newItem.name,
                label: this.newItem.label,
              });
              this.saveSourcesMenu();
              this.newItem = { name: '', label: '' };
              this.fetchDropdownItems();
            }
          });
      } else {
        alert('Please enter both name and label');
      }
    }

    saveSourcesMenu(): void {
      localStorage.setItem('sourcesMenu', JSON.stringify(this.sourcesMenu));
    }

    loadSourcesMenu(): void {
      const storedMenu = localStorage.getItem('sourcesMenu');
      if (storedMenu) {
        this.sourcesMenu = JSON.parse(storedMenu);
      } else {
        this.menuItemsSubscription = this.menuService
          .getMenuItems()
          .subscribe((menuItems) => {
            this.sourcesMenu = menuItems;
          });
      }
    }

    openUpdateModal(content: any, sourceName: string, labelName: string) {
      this.updateForm.patchValue({
        sourceName: sourceName,
        labelName: labelName,
        updated_sourceName: sourceName,
        updated_labelName: labelName,
        updated_created_by: this.currentUser.username,
        updated_created_time: new Date().toISOString(),
      });
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    submitEdit(): void {
      if (this.updateForm.valid) {
        const formValues = this.updateForm.value;
        const updatedData = {
          sourceName: formValues.sourceName,
          labelName: formValues.labelName,
          updated_sourceName: formValues.updated_sourceName,
          updated_labelName: formValues.updated_labelName,
          updated_created_by: formValues.updated_created_by,
          updated_created_time: formValues.updated_created_time,
        };
        this.menuService.updateDataSource(updatedData).subscribe(
          (response) => {
            if (
              response.statusCode === 200 ||
              response.body?.message === 'Updated Successfully'
            ) {
              this.sourcesMenu = this.sourcesMenu.filter(
                (item) => item.name !== formValues.sourceName
              );
              this.visibleSources.delete(formValues.sourceName);

              this.sourcesMenu.push({
                name: formValues.updated_sourceName,
                label: formValues.updated_labelName,
              });
              this.visibleSources.add(formValues.updated_sourceName);

              // Save updated sourcesMenu and visibleSources to local storage
              this.saveSourcesMenu();
              this.saveVisibleSources();

              // Notify the user and refresh dropdown items
              alert('Item updated successfully!');
              this.fetchDropdownItems();
            } else {
              alert('Failed to update item');
              console.error('Update failed:', response);
            }
          },
          (error) => {
            console.error('Error updating item:', error);
            alert('Failed to update item');
          }
        );
      } else {
        alert('Please fill in all fields');
      }
    }


    editItem(sourceName: string): void {
      const item = this.dropdownItems.find(
        (item) => item.sourceName === sourceName
      );
      if (item) {
        this.updateForm.patchValue({
          sourceName: item.sourceName,
          labelName: item.labelName,
          updated_sourceName: item.sourceName,
          updated_labelName: item.labelName,
          updated_created_by: this.currentUser.username,
          updated_created_time: new Date().toISOString(),
        });

        const modalElement = document.getElementById('editModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      }
    }

    // Open delete confirmation modal
    openDeleteConfirmationModal(
      item: { sourceName: string; labelName: string },
      deleteModalContent: any
    ) {
      this.currentItemToDelete = item;
      this.modalService.open(deleteModalContent, {
        ariaLabelledBy: 'deleteConfirmationModalLabel',
      });
    }

    // Confirm deletion and remove the item
    confirmDelete(): void {
      if (this.currentItemToDelete) {
        this.deleteItem(
          this.currentItemToDelete.sourceName,
          this.currentItemToDelete.labelName
        );
        this.currentItemToDelete = null;
      }
    }

    deleteItem(sourceName: string, labelName: string): void {
      this.menuService.deleteDataSource(sourceName, labelName).subscribe(
        (response) => {
          if (response.statusCode === 200) {
            alert('Item deleted successfully!');

            // Remove the item from the dropdownItems array
            this.dropdownItems = this.dropdownItems.filter(
              (item) => item.sourceName !== sourceName
            );

            // Remove the item from the sourcesMenu array
            this.sourcesMenu = this.sourcesMenu.filter(
              (item) => item.name !== sourceName
            );

            // Save the updated sourcesMenu to local storage
            this.saveSourcesMenu();

            // Update the visibleSources set if necessary
            this.visibleSources.delete(sourceName);
            this.saveVisibleSources();
          } else if (response.statusCode === 203) {
            alert('Item not found in existing data sources.');
          } else {
            alert('Failed to delete item');
          }
        },
        (error) => {
          console.error('Error deleting item:', error);
          alert('Failed to delete item');
        }
      );
    }

    private closeDropdown(): void {
      const dropdownElement = document.getElementById('navbarDropdown');
      if (dropdownElement) {
        const bootstrapDropdown =
          bootstrap.Dropdown.getOrCreateInstance(dropdownElement);
        bootstrapDropdown.hide();
      }
    }

    // New Methods for "All" tab functionality

    /**
     * Selects a specific tab and fetches its data.
     * @param sourceName The name of the source to fetch data for.
     */
    selectTab(sourceName: string): void {
      this.selectedSource = sourceName;
      this.activeTab = sourceName;
      this.fetchDataForTab(sourceName);
    }

    /**
     * Selects all tabs and aggregates data from each.
     */
    selectAllTabs(): void {
      this.selectedSource = ''; // Clear selected source to indicate "All" is selected
      this.aggregateDataForAllTabs();
    }

    /**
     * Fetches data for a specific tab and sets it to displayData.
     * @param sourceName The name of the source to fetch data for.
     */
    fetchDataForTab(sourceName: string): void {
      // Simulate fetching data for the selected tab
      this.displayData = [`Data from ${sourceName} tab`];
      console.log(`Fetching data for ${sourceName} tab...`);
    }

    /**
     * Aggregates data for all active tabs and sets it to displayData.
     */
    aggregateDataForAllTabs(): void {
      this.displayData = this.sourcesMenu.map(
        (source) => `Data from ${source.label} tab`
      );
      console.log('Aggregating data from all active tabs...');
    }
  }

