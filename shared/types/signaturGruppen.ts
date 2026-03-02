export interface Status {
    id: string;
    received_at: Date;
    event_type: string;
    payload: Record<string, string>;
    headers: Record<string, string>;
}