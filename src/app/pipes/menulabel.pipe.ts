import { Pipe, PipeTransform, inject } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Pipe({
  name: 'menulabel',
  pure: false // This allows the pipe to react to changes in the menu items
})
export class MenulabelPipe implements PipeTransform {
  private menuService = inject(MenuService);
  private menuItemsCache = new Map<string, string>();
  private isSubscribed = false;

  transform(value: string, ...args: unknown[]): string {
    if (!this.isSubscribed) {
      this.menuService.menuItems$.subscribe(menuItems => {
        menuItems.forEach(item => {
          this.menuItemsCache.set(item.name, item.label);
        });
      });
      this.isSubscribed = true;
    }

    return this.menuItemsCache.get(value) || value; // Use value as fallback if label not found
  }
}
