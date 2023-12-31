export default class Seller {
    id: number;
    name: string;
    email: string;
    phone: string;

    constructor(id: number, name: string, email: string, phone: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    equal(obj: Seller): boolean {
        return this.id === obj.id;
    }
}

export class SellerFactory {
    static createSeller = (
        id: number,
        name: string,
        email: string,
        phone: string
    ): Seller => {
        return new Seller(id, name, email, phone);
    };
}
