export type Service = {
    title: string
    text: string
    badge?: string
    contactSubject?: string
    contactText?: string
}

export type ServiceSection = {
    id: string
    label: string
    title: string
    text: string
    services: Service[]
}
