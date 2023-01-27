import React, { Dispatch, Suspense, useState } from 'react'
import {
  Routes,
  BrowserRouter as Router,
  Route,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from 'react-router-dom'
import { MemberContext, SearchContext } from './contexts/MemberContext'
import { ChurchContext } from './contexts/ChurchContext'
import ProtectedRoute from './auth/ProtectedRoute'
import ProtectedRouteHome from './auth/ProtectedRouteHome'
import ServantsDashboard from 'pages/dashboards/ServantsDashboard'
import ServantsChurchList from 'pages/dashboards/ServantsChurchList'
import { ServiceContext } from 'contexts/ServiceContext'
import MembersDirectoryRoute from './pages/directory/MembersDirectoryRoute'
import Navigation from 'pages/dashboards/Navigation'
import { dashboards } from 'pages/dashboards/dashboardRoutes'
import {
  directory,
  memberDirectory,
  memberGrids,
  quickFacts,
} from 'pages/directory/directoryRoutes'
import { graphs, services } from 'pages/services/servicesRoutes'
import { arrivals } from 'pages/arrivals/arrivalsRoutes'
import { campaigns } from 'pages/campaigns/campaignsRoutes'
import { reconciliation } from 'pages/reconciliation/reconRoutes'
import PageNotFound from 'pages/page-not-found/PageNotFound'
import SetPermissions from 'auth/SetPermissions'
import { permitMe } from 'permission-utils'
import useClickCard from 'hooks/useClickCard'
import { useAuth0 } from '@auth0/auth0-react'
import LoadingScreen from 'components/base-component/LoadingScreen'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { maps } from 'pages/maps/mapsRoutes'

type AppPropsType = {
  token: string
  themeOptions: {
    theme: string
    setTheme: Dispatch<React.SetStateAction<string>>
  }
}

const AppWithContext = (props: AppPropsType) => {
  const { theme, setTheme } = props.themeOptions
  const {
    clickCard,
    church,
    memberId,
    gatheringServiceId,
    streamId,
    councilId,
    constituencyId,
    bacentaId,
    fellowshipId,
    sontaId,
    ministryId,
    bussingRecordId,
    serviceRecordId,
    vehicleRecordId,
    oversightId,
    multiplicationRecordId,

    //Set State
    setOversightId,
    setGatheringServiceId,
    setChurch,
    setStreamId,
    setCouncilId,
    setConstituencyId,
  } = useClickCard()

  const doNotUse = {
    setOversightId,
    setGatheringServiceId,
    setChurch,
    setStreamId,
    setCouncilId,
    setConstituencyId,
  }

  const { user } = useAuth0()

  const [currentUser, setCurrentUser] = useState(
    sessionStorage.getItem('currentUser')
      ? JSON.parse(sessionStorage.getItem('currentUser') || '{}')
      : {
          __typename: 'Member',
          id: user?.sub?.replace('auth0|', ''),
          firstName: user?.given_name,
          lastName: user?.family_name,
          fullName: user?.name,
          picture: user?.picture,
          email: user?.email,
          roles: user && user[`https://flcadmin.netlify.app/roles`],
        }
  )

  const [userJobs, setUserJobs] = useState()

  const [searchKey, setSearchKey] = useState('')
  const [filters, setFilters] = useState({
    gender: [],
    maritalStatus: [],
    occupation: '',
    leaderTitle: [],
    leaderRank: [],
    ministry: [],
  })

  Sentry.init({
    dsn: 'https://a6fccd390f7a4cdfa48da901b0e2e22f@o1423098.ingest.sentry.io/6770463',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          // @ts-ignore
          matchRoutes
        ),
      }),
    ],
    beforeSend(event) {
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id })
      }
      return event
    },

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  })

  const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes)

  return (
    <Router>
      <ChurchContext.Provider
        value={{
          clickCard,
          filters,
          setFilters,
          church,
          memberId,
          gatheringServiceId,
          streamId,
          councilId,
          constituencyId,
          bacentaId,
          fellowshipId,
          sontaId,
          ministryId,
          oversightId,
          doNotUse,
        }}
      >
        <MemberContext.Provider
          value={{
            memberId,
            currentUser,
            setCurrentUser,
            theme,
            setTheme,
            userJobs,
            setUserJobs,
          }}
        >
          <SearchContext.Provider value={{ searchKey, setSearchKey }}>
            <ServiceContext.Provider
              value={{
                serviceRecordId,
                bussingRecordId,
                vehicleRecordId,
                multiplicationRecordId,
              }}
            >
              <SetPermissions token={props.token}>
                <>
                  <Navigation />
                  <div className={`bg ${theme}`}>
                    <Suspense fallback={<LoadingScreen />}>
                      <SentryRoutes>
                        {[
                          ...dashboards,
                          ...directory,
                          ...services,
                          ...arrivals,
                          ...campaigns,
                          ...reconciliation,
                          ...graphs,
                          ...maps,
                        ].map((route, i) => (
                          <Route
                            key={i}
                            path={route.path}
                            element={
                              <ProtectedRoute
                                roles={route.roles ?? ['all']}
                                placeholder={route.placeholder}
                              >
                                <route.element />
                              </ProtectedRoute>
                            }
                          />
                        ))}
                        {[
                          ...memberDirectory,
                          ...memberGrids,
                          ...quickFacts,
                        ].map((route, i) => (
                          <Route
                            key={i}
                            path={route.path}
                            element={
                              <MembersDirectoryRoute roles={route.roles}>
                                <route.element />
                              </MembersDirectoryRoute>
                            }
                          />
                        ))}

                        <Route
                          path="/dashboard/servants"
                          element={
                            <ProtectedRouteHome
                              roles={permitMe('Fellowship')}
                              component={<ServantsDashboard />}
                            />
                          }
                        />
                        <Route
                          path="/servants/church-list"
                          element={
                            <ProtectedRoute
                              roles={permitMe('Fellowship')}
                              placeholder
                            >
                              <ServantsChurchList />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="*" element={<PageNotFound />} />
                      </SentryRoutes>
                    </Suspense>
                  </div>
                </>
              </SetPermissions>
            </ServiceContext.Provider>
          </SearchContext.Provider>
        </MemberContext.Provider>
      </ChurchContext.Provider>
    </Router>
  )
}

export default AppWithContext
