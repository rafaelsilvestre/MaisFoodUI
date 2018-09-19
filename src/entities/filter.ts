import { Company } from './company';

export class Filter {
    constructor(public id: number, public name: string, public companies: Array<Company>){}

    public static createFilterObject(filter): Filter{
        return new Filter(filter.id, filter.name, filter.companies);
    }
}
