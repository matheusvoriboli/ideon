export enum Routes {
  INBOX = '/',
  COVERAGE_PERIODS = '/coverage-periods',
}

export const routeLabels: Record<Routes, string> = {
  [Routes.INBOX]: 'Inbox',
  [Routes.COVERAGE_PERIODS]: 'Coverage Periods',
}
