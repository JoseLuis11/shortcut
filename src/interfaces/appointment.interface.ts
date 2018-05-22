export interface Appointment {
    $key: string;
    date: string;
    clientName: string;
    employeeName: string;
    workplaceName: string;
    serviceNames: string[];
    payment: number;
}