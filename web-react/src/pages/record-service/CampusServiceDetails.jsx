import React, { useContext } from 'react'
import { ChurchContext } from '../../contexts/ChurchContext'

import { useQuery } from '@apollo/client'
import { DISPLAY_CAMPUS_SERVICE } from './RecordServiceMutations'
import { ServiceContext } from 'contexts/ServiceContext'

import ServiceDetails from './ServiceDetails'
import BaseComponent from 'components/base-component/BaseComponent'

const CampusServiceDetails = () => {
  const { campusId } = useContext(ChurchContext)
  const { serviceRecordId } = useContext(ServiceContext)
  const { data, loading, error } = useQuery(DISPLAY_CAMPUS_SERVICE, {
    variables: { serviceId: serviceRecordId, campusId: campusId },
  })

  return (
    <BaseComponent loadingState={loading} errorState={error} data={data}>
      <ServiceDetails
        service={data?.serviceRecords[0]}
        church={data?.campuses[0]}
      />
    </BaseComponent>
  )
}

export default CampusServiceDetails
