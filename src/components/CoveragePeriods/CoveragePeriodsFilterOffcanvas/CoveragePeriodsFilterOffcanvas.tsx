import { useState } from 'react'
import { Button, Dropdown, Offcanvas, RadioButton, Tabs } from '~/index'

const CoveragePeriodsFilterOffcanvas = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const [organizationFilter, setOrganizationFilter] = useState<
    (string | number)[]
  >([])
  const [carrierFilter, setCarrierFilter] = useState<(string | number)[]>([])
  const [distributionFormat, setDistributionFormat] = useState<'Edi' | 'Api'>(
    'Edi'
  )
  const [coverageStartDate, setCoverageStartDate] = useState<string>('')
  const [coverageEndDate, setCoverageEndDate] = useState<string>('')
  const [setupCompletion, setSetupCompletion] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'filter' | 'saved-filters'>(
    'filter'
  )
  return (
    <Offcanvas isOpen={isOpen} onClose={onClose}>
      <div className="mb-6">
        <Tabs
          tabs={[
            { id: 'filter', label: 'Filter' },
            { id: 'saved-filters', label: 'Saved Filters' },
          ]}
          onChange={tabId => {
            setActiveTab(tabId as 'filter' | 'saved-filters')
          }}
        />
      </div>
      {activeTab === 'filter' ? (
        <div>
          <div className="space-y-4 flex-1 overflow-y-auto">
            <Dropdown
              label="Organization Name"
              value={organizationFilter}
              options={[
                { label: 'Amazon', value: 'amazon' },
                { label: 'Middo', value: 'middo' },
                { label: 'Demo Group 1', value: 'demo-group-1' },
                {
                  label: 'Product Release Webinar Company',
                  value: 'product-release',
                },
                { label: 'Puma', value: 'puma' },
              ]}
              onChange={value => {
                setOrganizationFilter(value as (string | number)[])
              }}
              multiple
              searchable
            />
            <Dropdown
              label="Group"
              value={carrierFilter}
              options={[
                { label: 'Group A', value: 'group-a' },
                { label: 'Group B', value: 'group-b' },
                { label: 'Group C', value: 'group-c' },
              ]}
              onChange={value => {
                setCarrierFilter(value as (string | number)[])
              }}
            />
            <div className="flex flex-col mb-2">
              <label className="text-sm font-semibold">
                Distribution Format
              </label>
            </div>
            <div className="flex gap-2 w-full">
              <div className="flex items-center gap-2 w-full">
                <RadioButton
                  name="distribution-format"
                  value="Edi"
                  checked={distributionFormat === 'Edi'}
                  onChange={() => setDistributionFormat('Edi')}
                  label="Edi"
                />
              </div>
              <div className="flex items-center gap-2 w-full">
                <RadioButton
                  name="distribution-format"
                  value="Api"
                  checked={distributionFormat === 'Api'}
                  onChange={() => setDistributionFormat('Api')}
                  label="Api"
                />
              </div>
            </div>
            <div className="flex gap-2 items-end">
              <Dropdown
                label="Coverage Start Date"
                value={coverageStartDate}
                options={[
                  { label: 'Before', value: 'before' },
                  { label: 'After', value: 'after' },
                ]}
                onChange={value => {
                  setCoverageStartDate(value as string)
                }}
                className="w-full"
              />
              <input
                type="date"
                placeholder="Search"
                className="w-full p-2 rounded-lg border border-gray-300"
              />
            </div>
            <div className="flex gap-2 items-end">
              <Dropdown
                label="Coverage End Date"
                value={coverageEndDate}
                options={[
                  { label: 'Before', value: 'before' },
                  { label: 'After', value: 'after' },
                ]}
                onChange={value => {
                  setCoverageEndDate(value as string)
                }}
                className="w-full"
              />
              <input
                type="date"
                placeholder="Search"
                className="w-full p-2 rounded-lg border border-gray-300"
              />
            </div>
            <div className="flex gap-2 items-end">
              <Dropdown
                label="Setup Complete At"
                value={setupCompletion}
                options={[
                  { label: 'Before', value: 'before' },
                  { label: 'After', value: 'after' },
                ]}
                onChange={value => {
                  setSetupCompletion(value as string)
                }}
                className="w-full"
              />
              <input
                type="date"
                placeholder="Search"
                className="w-full p-2 rounded-lg border border-gray-300"
              />
            </div>
            <Dropdown
              label="Carrier"
              value={carrierFilter}
              options={[
                { label: 'Group A', value: 'group-a' },
                { label: 'Group B', value: 'group-b' },
                { label: 'Group C', value: 'group-c' },
              ]}
              onChange={value => {
                setCarrierFilter(value as (string | number)[])
              }}
            />
            <Dropdown
              label="State"
              value={carrierFilter}
              options={[
                { label: 'Group A', value: 'group-a' },
                { label: 'Group B', value: 'group-b' },
                { label: 'Group C', value: 'group-c' },
              ]}
              onChange={value => {
                setCarrierFilter(value as (string | number)[])
              }}
            />
            <div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {}}
                className="ml-auto"
              >
                Save Filter
              </Button>
            </div>
          </div>
          <div className="flex gap-2 pt-4 mt-auto absolute bottom-0 left-0 right-0 p-6 border-t border-gray-300">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setOrganizationFilter([])
                setCarrierFilter([])
              }}
            >
              Reset
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                onClose()
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="space-y-4 flex-1 overflow-y-auto">
            <div className="flex flex-col mb-2">
              <label className="text-sm font-semibold">Saved Filters</label>
            </div>
          </div>
        </div>
      )}
    </Offcanvas>
  )
}

export default CoveragePeriodsFilterOffcanvas
