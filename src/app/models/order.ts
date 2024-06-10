export class Order {
    id_order!: number;
    order_date!: Date;
    items_price!: number;
    shipping_price!: number;
    total_price!: number;
    id_transaction!: string; 
    transaction_date!: Date;
    transaction_amount!: number;
    payment_status!: string;
    id_user!: string; 
    id_shipping!: number;
}
