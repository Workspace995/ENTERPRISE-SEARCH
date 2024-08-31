import { Injectable } from '@angular/core';
import { MenuService } from './menu.service'; // Import MenuService

@Injectable({
  providedIn: 'root',
})
export class QuerybuilderService {
  filters: any;
  body: any;

  constructor(private menuService: MenuService) {} // Inject MenuService

  _createMultiValueFilter(key: string) {
    let obj: any = {};
    let values = this.filters[key].split(',');
    if (values.length > 1) {
      obj = {
        bool: {
          should: [],
        },
      };
      values.forEach((value: any) => {
        obj.bool.should.push({
          match: {
            [key]: value,
          },
        });
      });
    } else {
      obj = {
        match: {
          [key]: this.filters[key],
        },
      };
    }

    return obj;
  }

  _createBasicBody(size: number) {
    let from = this.filters.page ? size * (this.filters.page - 1) : 0;
    this.body = {
      from: from,
      size: size,
      query: {
        bool: {
          must: [],
        },
      },
      sort: [
        {
          _score: 'desc',
        },
      ],
    };
  }

  _createAggrField(aggsField: string) {
    this.body.aggs = {
      response_codes: {
        terms: {
          field: aggsField,
          size: 100,
        },
      },
    };
  }

  _createQuery() {
    if (this.filters.q) {
      this.body.query.bool.must.push({
        query_string: {
          query: this.filters.q,
        },
      });
    }
  }

  _cleanUp() {
    delete this.filters.q;
    delete this.filters.page;
    delete this.filters.question;
  }

  // Fetch all active sources dynamically from the menu service
  _setDefaultSource() {
    if (!this.filters.source) {
      // Fetch the currently active sources from the menu service
      this.menuService.getMenuItems().subscribe((menuItems) => {
        this.filters.source = menuItems.map((item) => item.name).join(',');
      });
    }
  }

  _createFilters() {
    if (Object.keys(this.filters).length > 0) {
      Object.keys(this.filters).forEach((key: string) => {
        this.body.query.bool.must.push(this._createMultiValueFilter(key));
      });
    }
  }

  _getRange(param: string) {
    var [field, key, comparison] = param.split('-');
    return {
      range: {
        [key]: {
          [comparison]: this.filters[param],
          format: 'yyyy/mm/dd',
        },
      },
    };
  }

  _grantDateFilters() {
    let filterKeys = Object.keys(this.filters);
    for (let index = 0; index < filterKeys.length; index++) {
      const element = filterKeys[index];
      if (element.includes('customdate')) {
        this.body.query.bool.must.push(this._getRange(element));
        delete this.filters[element];
      }
    }
  }

  build(filters: any, size: number = 20, aggsField: any = false) {
    this.filters = Object.assign({}, filters);
    this._createBasicBody(size);
    if (aggsField) {
      this._createAggrField(aggsField);
    }
    this._createQuery();
    this._setDefaultSource(); // Ensure default source is set
    this._grantDateFilters();
    this._cleanUp();
    this._createFilters();

    this.body.highlight = {
      fields: {
        title: {},
      },
      tags_schema: 'styled',
      pre_tags: ["<strong class='highlight'>"],
      post_tags: ['</strong>'],
    };

    return this.body;
  }
}
