export interface Status {
    id: number;
    received_at: Date;
    event_type: string;
    payload: Record<string, string>;
    headers: Record<string, string>;
}