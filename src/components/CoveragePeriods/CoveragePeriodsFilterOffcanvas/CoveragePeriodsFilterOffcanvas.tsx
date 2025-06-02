import { useState } from 'react'
import { Button, Dropdown, Offcanvas } from '~/index'

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
  const [accountFilter, setAccountFilter] = useState<(string | number)[]>([])
  return (
    <Offcanvas isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
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
        />

        <Dropdown
          label="Carrier"
          value={carrierFilter}
          options={[
            { label: 'Carrier A', value: 'carrier-a' },
            { label: 'Carrier B', value: 'carrier-b' },
            { label: 'Carrier C', value: 'carrier-c' },
          ]}
          onChange={value => {
            setCarrierFilter(value as (string | number)[])
          }}
        />

        <Dropdown
          label="Account"
          value={accountFilter}
          options={[
            { label: 'Account 1', value: 'account-1' },
            { label: 'Account 2', value: 'account-2' },
            { label: 'Account 3', value: 'account-3' },
          ]}
          onChange={value => {
            setAccountFilter(value as (string | number)[])
          }}
        />

        <div className="flex gap-2 pt-4">
          <Button
            className="flex-1"
            onClick={() => {
              onClose()
            }}
          >
            Aplicar Filtros
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setOrganizationFilter([])
              setCarrierFilter([])
              setAccountFilter([])
            }}
          >
            Limpar
          </Button>
        </div>
      </div>
    </Offcanvas>
  )
}

export default CoveragePeriodsFilterOffcanvas
