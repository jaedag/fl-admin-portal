// Permissions Things
export const permitLeader = (churchLevel) => {
    let permittedFor = [];
    switch (churchLevel.toLowerCase()) {
        case 'fellowship':
            permittedFor = [
                'leaderOversight',
                'leaderGatheringService',
                'leaderStream',
                'leaderCouncil',
                'leaderConstituency',
                'leaderBacenta',
                'leaderFellowship',
            ];
            break;
        case 'bacenta':
            permittedFor = [
                'leaderOversight',
                'leaderGatheringService',
                'leaderStream',
                'leaderCouncil',
                'leaderConstituency',
                'leaderBacenta',
            ];
            break;
        case 'constituency':
            permittedFor = [
                'leaderOversight',
                'leaderGatheringService',
                'leaderStream',
                'leaderCouncil',
                'leaderConstituency',
            ];
            break;
        case 'councils':
            permittedFor = [
                'leaderOversight',
                'leaderGatheringService',
                'leaderStream',
                'leaderCouncil',
            ];
            break;
        case 'stream':
            permittedFor = [
                'leaderOversight',
                'leaderGatheringService',
                'leaderStream',
            ];
            break;
        case 'gatheringservice':
            permittedFor = ['leaderOversight', 'leaderGatheringService'];
            break;
        case 'oversight':
            permittedFor = ['leaderOversight'];
            break;
        case 'federalministry':
            permittedFor = ['leaderGatheringService', 'leaderFederalMinistry'];
            break;
        case 'ministry':
            permittedFor = [
                'leaderGatheringService',
                'leaderStream',
                'leaderFederalMinistry',
                'leaderMinistry',
            ];
            break;
        case 'hub':
            permittedFor = [
                'leaderGatheringService',
                'leaderFederalMinistry',
                'leaderStream',
                'leaderMinistry',
                'leaderHub',
            ];
            break;
        case 'sonta':
            permittedFor = [
                'leaderGatheringService',
                'leaderStream',
                'leaderMinistry',
                'leaderFederalMinistry',
                'leaderSonta',
                'leaderHub',
            ];
            break;
        default:
            permittedFor = [];
            break;
    }
    return permittedFor;
};
export const permitAdmin = (churchLevel) => {
    let permittedFor = [];
    switch (churchLevel) {
        case 'Fellowship':
        case 'Bacenta':
        case 'Sonta':
        case 'Hub':
        case 'Constituency':
            permittedFor = [
                'adminOversight',
                'adminGatheringService',
                'adminStream',
                'adminCouncil',
                'adminConstituency',
            ];
            break;
        case 'Council':
            permittedFor = [
                'adminOversight',
                'adminGatheringService',
                'adminStream',
                'adminCouncil',
            ];
            break;
        case 'Stream':
            permittedFor = ['adminOversight', 'adminGatheringService', 'adminStream'];
            break;
        case 'GatheringService':
            permittedFor = ['adminOversight', 'adminGatheringService'];
            break;
        case 'Oversight':
            permittedFor = ['adminOversight', 'adminGatheringService'];
            break;
        case 'Federalministry':
            permittedFor = ['adminGatheringService', 'adminFederalministry'];
            break;
        case 'Ministry':
            permittedFor = ['adminStream', 'adminFederalministry', 'adminMinistry'];
            break;
        default:
            permittedFor = [];
            break;
    }
    return permittedFor;
};
export const permitLeaderAdmin = (churchLevel) => {
    return [...permitLeader(churchLevel), ...permitAdmin(churchLevel)];
};
export const permitArrivals = (churchLevel) => {
    let permittedFor = [];
    switch (churchLevel) {
        case 'Fellowship':
        case 'Bacenta':
            permittedFor = [
                'arrivalsAdminGatheringService',
                'arrivalsAdminStream',
                'arrivalsAdminCouncil',
                'arrivalsAdminConstituency',
            ];
            break;
        case 'Constituency':
            permittedFor = [
                'arrivalsAdminGatheringService',
                'arrivalsAdminStream',
                'arrivalsAdminCouncil',
                'arrivalsAdminConstituency',
            ];
            break;
        case 'Council':
            permittedFor = [
                'arrivalsAdminGatheringService',
                'arrivalsAdminStream',
                'arrivalsAdminCouncil',
            ];
            break;
        case 'Stream':
            permittedFor = ['arrivalsAdminGatheringService', 'arrivalsAdminStream'];
            break;
        case 'GatheringService':
            permittedFor = ['arrivalsAdminGatheringService'];
            break;
        default:
            permittedFor = [];
            break;
    }
    return [...permitAdmin(churchLevel), ...permittedFor];
};
export const permitArrivalsCounter = () => {
    return ['arrivalsCounterStream'];
};
export const permitArrivalsHelpers = () => {
    return ['arrivalsCounterStream'];
};
export const permitTeller = () => {
    return ['tellerStream'];
};
export const permitSheepSeeker = () => {
    return ['sheepseekerStream'];
};
export const permitLeaderAdminArrivals = (churchLevel) => {
    return [...permitLeaderAdmin(churchLevel), ...permitArrivals(churchLevel)];
};
export const permitAdminArrivals = (churchLevel) => {
    return [...permitAdmin(churchLevel), ...permitArrivals(churchLevel)];
};
export const permitMe = (churchLevel) => {
    return [
        ...permitLeaderAdmin(churchLevel),
        ...permitArrivals(churchLevel),
        ...permitArrivalsHelpers(),
    ];
};
