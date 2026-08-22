import type {
  PublicSignaturComponentUpdatePayload,
  PublicSignaturIncidentPayload,
  PublicStatus,
} from '#shared/types/signaturGruppen';

export type IncidentStatusLine = PublicStatus & {
  payload: PublicSignaturIncidentPayload;
};

export type ComponentStatusLine = PublicStatus & {
  payload: PublicSignaturComponentUpdatePayload;
};

export type StatusLineGroup<T extends PublicStatus = PublicStatus> = {
  key: string;
  statusLine: T;
  groupSize: number;
  updates: T[];
};

export type ComponentGroupSection = {
  key: string;
  label: string;
  groups: StatusLineGroup<ComponentStatusLine>[];
};

export type IncidentDayGroup = {
  key: string;
  label: string;
  groups: StatusLineGroup<IncidentStatusLine>[];
};

const UNGROUPED_COMPONENT_KEY = 'ungrouped';

const COMPONENT_GROUP_LABELS: Record<string, string> = {
  [UNGROUPED_COMPONENT_KEY]: 'Primære komponenter',
  'nl0cn4ndtcb2': 'Signaturgruppen Broker Identity Providers',
  '3n9qvkwfzxnf': 'Signaturgruppen Broker Services',
  '5pfm4rw14vny': 'Signaturgruppen IdP',
};

const COMPONENT_GROUP_ORDER = [
  UNGROUPED_COMPONENT_KEY,
  'nl0cn4ndtcb2',
  '3n9qvkwfzxnf',
  '5pfm4rw14vny',
];

export const isIncidentStatusLine = (statusLine: PublicStatus): statusLine is IncidentStatusLine => {
  return 'incident' in statusLine.payload
}

export const isComponentStatusLine = (statusLine: PublicStatus): statusLine is ComponentStatusLine => {
  return 'component_update' in statusLine.payload
}

export const getIncidentGroups = (statusLines: PublicStatus[]) => {
  return groupStatusLines(
    statusLines.filter(isIncidentStatusLine),
    getIncidentGroupKey,
  )
}

export const getComponentGroups = (statusLines: PublicStatus[]) => {
  return groupStatusLines(
    statusLines.filter(isComponentStatusLine),
    getComponentGroupKey,
  ).sort(sortComponentGroups)
}

export const getCurrentIncidentGroups = (groups: StatusLineGroup<IncidentStatusLine>[]) => {
  return groups.filter((group) => isIncidentStatusActive(getIncidentStatus(group.statusLine)))
}

export const getCurrentComponentGroups = (groups: StatusLineGroup<ComponentStatusLine>[]) => {
  return groups.filter((group) => isComponentStatusActive(getComponentStatus(group.statusLine)))
}

export const getComponentGroupSections = (groups: StatusLineGroup<ComponentStatusLine>[]) => {
  const sections = new Map<string, ComponentGroupSection>()

  for (const group of groups) {
    const key = getComponentGroupSectionKey(group.statusLine)
    const existingSection = sections.get(key)

    if (existingSection) {
      existingSection.groups.push(group)
      continue
    }

    sections.set(key, {
      key,
      label: COMPONENT_GROUP_LABELS[key] ?? 'Øvrige komponenter',
      groups: [group],
    })
  }

  return [...sections.values()].sort((first, second) => {
    const firstOrder = getComponentGroupOrder(first.key)
    const secondOrder = getComponentGroupOrder(second.key)

    if (firstOrder !== secondOrder) {
      return firstOrder - secondOrder
    }

    return first.label.localeCompare(second.label, 'da')
  })
}

export const getComponentGroupSectionStatus = (section: ComponentGroupSection) => {
  return getMostUrgentStatus(section.groups.map((group) => getComponentStatus(group.statusLine)))
}

export const getIncidentGroupForStatusLine = (
  groups: StatusLineGroup<IncidentStatusLine>[],
  statusLine: IncidentStatusLine,
) => {
  const key = getIncidentGroupKey(statusLine)
  return groups.find((group) => group.key === key) ?? createStatusLineGroup(key, statusLine)
}

export const getComponentGroupForStatusLine = (
  groups: StatusLineGroup<ComponentStatusLine>[],
  statusLine: ComponentStatusLine,
) => {
  const key = getComponentGroupKey(statusLine)
  return groups.find((group) => group.key === key) ?? createStatusLineGroup(key, statusLine)
}

export const getIncidentGroupsForComponent = (
  groups: StatusLineGroup<IncidentStatusLine>[],
  componentId: string,
) => {
  return groups.filter((group) => {
    return group.updates.some((statusLine) => {
      const incident = statusLine.payload.incident
      const componentMatch = incident.components?.some((component) => component.id === componentId) ?? false
      const affectedComponentMatch = incident.incident_updates?.some((update) => {
        return update.affected_components?.some((component) => component.code === componentId) ?? false
      }) ?? false

      return componentMatch || affectedComponentMatch
    })
  })
}

export const getIncidentDayGroups = (groups: StatusLineGroup<IncidentStatusLine>[]) => {
  const days = new Map<string, IncidentDayGroup>()

  for (const group of groups) {
    const date = new Date(group.statusLine.received_at)
    const key = date.toISOString().slice(0, 10)
    const existingDay = days.get(key)

    if (existingDay) {
      existingDay.groups.push(group)
      continue
    }

    days.set(key, {
      key,
      label: formatDay(date),
      groups: [group],
    })
  }

  return [...days.values()]
}

export const getRecentComponentChanges = (statusLines: PublicStatus[], count = 8) => {
  return statusLines.filter(isComponentStatusLine).slice(0, count)
}

export const getIncidentStatus = (statusLine: IncidentStatusLine) => {
  return statusLine.payload.incident.status ?? statusLine.event_type ?? 'unknown'
}

export const getComponentStatus = (statusLine: ComponentStatusLine) => {
  return statusLine.payload.component_update.new_status
    ?? statusLine.payload.component.status
    ?? statusLine.event_type
    ?? 'unknown'
}

export const getComponentName = (statusLine: ComponentStatusLine) => {
  return statusLine.payload.component.name ?? 'Ukendt komponent'
}

export const getComponentGroupLabel = (statusLine: ComponentStatusLine) => {
  const key = statusLine.payload.component.group_id ?? UNGROUPED_COMPONENT_KEY
  return COMPONENT_GROUP_LABELS[key] ?? 'Øvrige komponenter'
}

export const getComponentTransition = (statusLine: ComponentStatusLine) => {
  const oldStatus = statusLine.payload.component_update.old_status ?? 'unknown'
  const newStatus = getComponentStatus(statusLine)

  return `${oldStatus} til ${newStatus}`
}

export const isIncidentStatusActive = (status: string) => {
  return !['completed', 'resolved'].includes(status)
}

export const isComponentStatusActive = (status: string) => {
  return status !== 'operational'
}

export const formatDate = (value: Date | string) => {
  return new Date(value).toLocaleString()
}

export const formatDay = (value: Date) => {
  return new Intl.DateTimeFormat('da-DK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(value)
}

export const formatStatusText = (value: string) => {
  return value
    .replaceAll('_', ' ')
    .replace(/^\w/, (letter) => letter.toUpperCase())
}

export const getStatusClass = (status: string) => {
  switch (status) {
    case 'operational':
    case 'completed':
    case 'resolved':
      return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
    case 'scheduled':
    case 'in_progress':
    case 'under_maintenance':
    case 'monitoring':
    case 'verifying':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
    case 'major_outage':
    case 'partial_outage':
    case 'degraded_performance':
    case 'investigating':
      return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
    default:
      return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
  }
}

export const getStatusBorderClass = (status: string) => {
  switch (status) {
    case 'operational':
    case 'completed':
    case 'resolved':
      return 'border-l-green-500 dark:border-l-green-500 border-t-green-500 dark:border-t-green-500'
    case 'scheduled':
    case 'in_progress':
    case 'under_maintenance':
    case 'monitoring':
    case 'verifying':
      return 'border-l-amber-500 dark:border-l-amber-500 border-t-amber-500 dark:border-t-amber-500'
    case 'major_outage':
    case 'partial_outage':
    case 'degraded_performance':
    case 'investigating':
      return 'border-l-red-500 dark:border-l-red-500 border-t-red-500 dark:border-t-red-500'
    default:
      return 'border-l-zinc-400 dark:border-l-zinc-400 border-t-zinc-400 dark:border-t-zinc-400'
  }
}

const getMostUrgentStatus = (statuses: string[]) => {
  return statuses.reduce((mostUrgentStatus, status) => {
    return getStatusSeverity(status) > getStatusSeverity(mostUrgentStatus)
      ? status
      : mostUrgentStatus
  }, 'operational')
}

const getStatusSeverity = (status: string) => {
  switch (status) {
    case 'major_outage':
      return 5
    case 'partial_outage':
      return 4
    case 'degraded_performance':
    case 'investigating':
      return 3
    case 'under_maintenance':
    case 'in_progress':
      return 2
    case 'scheduled':
    case 'monitoring':
    case 'verifying':
      return 1
    default:
      return 0
  }
}

const groupStatusLines = <T extends PublicStatus>(
  statusLines: T[],
  getKey: (statusLine: T) => string,
) => {
  const groups = new Map<string, StatusLineGroup<T>>()

  for (const statusLine of statusLines) {
    const key = getKey(statusLine)
    const existingGroup = groups.get(key)

    if (existingGroup) {
      existingGroup.groupSize += 1
      existingGroup.updates.push(statusLine)
      continue
    }

    groups.set(key, {
      ...createStatusLineGroup(key, statusLine),
    })
  }

  return [...groups.values()]
}

const createStatusLineGroup = <T extends PublicStatus>(
  key: string,
  statusLine: T,
): StatusLineGroup<T> => {
  return {
    key,
    statusLine,
    groupSize: 1,
    updates: [statusLine],
  }
}

const getIncidentGroupKey = (statusLine: IncidentStatusLine) => {
  return `incident-${statusLine.payload.page.id}-${statusLine.payload.incident.id}`
}

const getComponentGroupKey = (statusLine: ComponentStatusLine) => {
  const componentId = statusLine.payload.component.id
    ?? statusLine.payload.component_update.component_id

  return componentId
    ? `component-${statusLine.payload.page.id}-${componentId}`
    : `status-${statusLine.id}`
}

const getComponentGroupSectionKey = (statusLine: ComponentStatusLine) => {
  return statusLine.payload.component.group_id ?? UNGROUPED_COMPONENT_KEY
}

const getComponentGroupOrder = (key: string) => {
  const index = COMPONENT_GROUP_ORDER.indexOf(key)
  return index === -1 ? COMPONENT_GROUP_ORDER.length : index
}

const sortComponentGroups = (
  first: StatusLineGroup<ComponentStatusLine>,
  second: StatusLineGroup<ComponentStatusLine>,
) => {
  const firstIsActive = isComponentStatusActive(getComponentStatus(first.statusLine))
  const secondIsActive = isComponentStatusActive(getComponentStatus(second.statusLine))

  if (firstIsActive !== secondIsActive) {
    return firstIsActive ? -1 : 1
  }

  const firstPosition = first.statusLine.payload.component.position ?? Number.MAX_SAFE_INTEGER
  const secondPosition = second.statusLine.payload.component.position ?? Number.MAX_SAFE_INTEGER

  if (firstPosition !== secondPosition) {
    return firstPosition - secondPosition
  }

  return getComponentName(first.statusLine).localeCompare(getComponentName(second.statusLine), 'da')
}
