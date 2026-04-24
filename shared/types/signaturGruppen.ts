export interface SignaturMeta {
    unsubscribe?: string;
    documentation?: string;
    generated_at?: string;
    event_type?: string;
}

export interface SignaturPage {
    id: string;
    status_indicator?: string;
    status_description?: string;
}

export interface SignaturComponent {
    id: string;
    name: string;
    status?: string;
    description?: string | null;
    page_id?: string;
    group_id?: string | null;
    position?: number;
    showcase?: boolean;
    created_at?: string;
    updated_at?: string;
    start_date?: string;
}

export interface SignaturAffectedComponent {
    code: string;
    name: string;
    new_status?: string | null;
    old_status?: string | null;
}

export interface SignaturIncidentUpdate {
    id: string;
    body: string;
    status?: string;
    created_at?: string;
    display_at?: string;
    updated_at?: string;
    incident_id?: string;
    affected_components?: SignaturAffectedComponent[] | null;
    deliver_notifications?: boolean;
}

export interface SignaturIncident {
    id: string;
    name: string;
    impact?: string;
    status?: string;
    page_id?: string;
    shortlink?: string;
    components?: SignaturComponent[];
    created_at?: string;
    started_at?: string | null;
    updated_at?: string;
    resolved_at?: string | null;
    monitoring_at?: string | null;
    scheduled_for?: string | null;
    scheduled_until?: string | null;
    incident_updates?: SignaturIncidentUpdate[];
}

export interface SignaturComponentUpdate {
    id: string;
    old_status?: string | null;
    new_status?: string | null;
    created_at?: string;
    component_type?: string;
    state?: string;
    component_id?: string;
}

export interface SignaturIncidentPayload {
    meta: SignaturMeta;
    page: SignaturPage;
    incident: SignaturIncident;
}

export interface SignaturComponentUpdatePayload {
    meta: SignaturMeta;
    page: SignaturPage;
    component: SignaturComponent;
    component_update: SignaturComponentUpdate;
}

export type SignaturPayload = SignaturIncidentPayload | SignaturComponentUpdatePayload;

export interface Status {
    id: number;
    received_at: Date | string;
    event_type: string | null;
    payload: SignaturPayload;
    headers: Record<string, string | undefined>;
}
