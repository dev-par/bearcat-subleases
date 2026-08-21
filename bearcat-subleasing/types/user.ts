export type PreferredContactMethod = 'email' | 'phone'

export const PREFERRED_CONTACT_METHOD_LABELS: Record<PreferredContactMethod, string> = {
    email: 'Email',
    phone: 'Phone',
}

export const PREFERRED_CONTACT_METHOD_OPTIONS: { value: PreferredContactMethod; label: string }[] = [
    { value: 'email', label: PREFERRED_CONTACT_METHOD_LABELS.email },
    { value: 'phone', label: PREFERRED_CONTACT_METHOD_LABELS.phone },
]
