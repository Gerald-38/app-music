export interface Album {
    id: string;
    ref: string;
    name: string;
    title: string;
    description: string;
    duration: number;
    status: string;
    url?: string;
    like?: string;
    tags?: Array<string>
}

export interface List {
    find(arg0: (elem: { id: string; }) => boolean): any;
    id : string;
    list: Array<string>;
}

