import * as _m0 from 'protobufjs/minimal';
import { TrackType, TrackSource, Room, ParticipantInfo, ClientConfiguration, TrackInfo, VideoQuality, ConnectionQuality, VideoLayer, ParticipantTracks, SpeakerInfo } from './livekit_models';
export declare const protobufPackage = "livekit";
export declare enum SignalTarget {
    PUBLISHER = 0,
    SUBSCRIBER = 1,
    UNRECOGNIZED = -1
}
export declare function signalTargetFromJSON(object: any): SignalTarget;
export declare function signalTargetToJSON(object: SignalTarget): string;
export declare enum StreamState {
    ACTIVE = 0,
    PAUSED = 1,
    UNRECOGNIZED = -1
}
export declare function streamStateFromJSON(object: any): StreamState;
export declare function streamStateToJSON(object: StreamState): string;
export declare enum CandidateProtocol {
    UDP = 0,
    TCP = 1,
    UNRECOGNIZED = -1
}
export declare function candidateProtocolFromJSON(object: any): CandidateProtocol;
export declare function candidateProtocolToJSON(object: CandidateProtocol): string;
export interface SignalRequest {
    /** initial join exchange, for publisher */
    offer?: SessionDescription | undefined;
    /** participant answering publisher offer */
    answer?: SessionDescription | undefined;
    trickle?: TrickleRequest | undefined;
    addTrack?: AddTrackRequest | undefined;
    /** mute the participant's published tracks */
    mute?: MuteTrackRequest | undefined;
    /** Subscribe or unsubscribe from tracks */
    subscription?: UpdateSubscription | undefined;
    /** Update settings of subscribed tracks */
    trackSetting?: UpdateTrackSettings | undefined;
    /** Immediately terminate session */
    leave?: LeaveRequest | undefined;
    /**
     * Set active published layers, deprecated in favor of automatic tracking
     *    SetSimulcastLayers simulcast = 9;
     * Update published video layers
     */
    updateLayers?: UpdateVideoLayers | undefined;
    /** Update subscriber permissions */
    subscriptionPermission?: SubscriptionPermission | undefined;
    /** sync client's subscribe state to server during reconnect */
    syncState?: SyncState | undefined;
    /** Simulate conditions, for client validations */
    simulate?: SimulateScenario | undefined;
}
export interface SignalResponse {
    /** sent when join is accepted */
    join?: JoinResponse | undefined;
    /** sent when server answers publisher */
    answer?: SessionDescription | undefined;
    /** sent when server is sending subscriber an offer */
    offer?: SessionDescription | undefined;
    /** sent when an ICE candidate is available */
    trickle?: TrickleRequest | undefined;
    /** sent when participants in the room has changed */
    update?: ParticipantUpdate | undefined;
    /** sent to the participant when their track has been published */
    trackPublished?: TrackPublishedResponse | undefined;
    /** Immediately terminate session */
    leave?: LeaveRequest | undefined;
    /** server initiated mute */
    mute?: MuteTrackRequest | undefined;
    /** indicates changes to speaker status, including when they've gone to not speaking */
    speakersChanged?: SpeakersChanged | undefined;
    /** sent when metadata of the room has changed */
    roomUpdate?: RoomUpdate | undefined;
    /** when connection quality changed */
    connectionQuality?: ConnectionQualityUpdate | undefined;
    /**
     * when streamed tracks state changed, used to notify when any of the streams were paused due to
     * congestion
     */
    streamStateUpdate?: StreamStateUpdate | undefined;
    /** when max subscribe quality changed, used by dynamic broadcasting to disable unused layers */
    subscribedQualityUpdate?: SubscribedQualityUpdate | undefined;
    /** when subscription permission changed */
    subscriptionPermissionUpdate?: SubscriptionPermissionUpdate | undefined;
    /** update the token the client was using, to prevent an active client from using an expired token */
    refreshToken: string | undefined;
    /** server initiated track unpublish */
    trackUnpublished?: TrackUnpublishedResponse | undefined;
}
export interface SimulcastCodec {
    codec: string;
    cid: string;
    enableSimulcastLayers: boolean;
}
export interface AddTrackRequest {
    /** client ID of track, to match it when RTC track is received */
    cid: string;
    name: string;
    type: TrackType;
    /** to be deprecated in favor of layers */
    width: number;
    height: number;
    /** true to add track and initialize to muted */
    muted: boolean;
    /** true if DTX (Discontinuous Transmission) is disabled for audio */
    disableDtx: boolean;
    source: TrackSource;
    layers: VideoLayer[];
    simulcastCodecs: SimulcastCodec[];
    /** server ID of track, publish new codec to exist track */
    sid: string;
}
export interface TrickleRequest {
    candidateInit: string;
    target: SignalTarget;
}
export interface MuteTrackRequest {
    sid: string;
    muted: boolean;
}
export interface JoinResponse {
    room?: Room;
    participant?: ParticipantInfo;
    otherParticipants: ParticipantInfo[];
    serverVersion: string;
    iceServers: ICEServer[];
    /** use subscriber as the primary PeerConnection */
    subscriberPrimary: boolean;
    /**
     * when the current server isn't available, return alternate url to retry connection
     * when this is set, the other fields will be largely empty
     */
    alternativeUrl: string;
    clientConfiguration?: ClientConfiguration;
    serverRegion: string;
}
export interface TrackPublishedResponse {
    cid: string;
    track?: TrackInfo;
}
export interface TrackUnpublishedResponse {
    trackSid: string;
}
export interface SessionDescription {
    /** "answer" | "offer" | "pranswer" | "rollback" */
    type: string;
    sdp: string;
}
export interface ParticipantUpdate {
    participants: ParticipantInfo[];
}
export interface UpdateSubscription {
    trackSids: string[];
    subscribe: boolean;
    participantTracks: ParticipantTracks[];
}
export interface UpdateTrackSettings {
    trackSids: string[];
    /** when true, the track is placed in a paused state, with no new data returned */
    disabled: boolean;
    /** deprecated in favor of width & height */
    quality: VideoQuality;
    /** for video, width to receive */
    width: number;
    /** for video, height to receive */
    height: number;
}
export interface LeaveRequest {
    /**
     * sent when server initiates the disconnect due to server-restart
     * indicates clients should attempt full-reconnect sequence
     */
    canReconnect: boolean;
}
/** message to indicate published video track dimensions are changing */
export interface UpdateVideoLayers {
    trackSid: string;
    layers: VideoLayer[];
}
export interface ICEServer {
    urls: string[];
    username: string;
    credential: string;
}
export interface SpeakersChanged {
    speakers: SpeakerInfo[];
}
export interface RoomUpdate {
    room?: Room;
}
export interface ConnectionQualityInfo {
    participantSid: string;
    quality: ConnectionQuality;
    score: number;
}
export interface ConnectionQualityUpdate {
    updates: ConnectionQualityInfo[];
}
export interface StreamStateInfo {
    participantSid: string;
    trackSid: string;
    state: StreamState;
}
export interface StreamStateUpdate {
    streamStates: StreamStateInfo[];
}
export interface SubscribedQuality {
    quality: VideoQuality;
    enabled: boolean;
}
export interface SubscribedCodec {
    codec: string;
    qualities: SubscribedQuality[];
}
export interface SubscribedQualityUpdate {
    trackSid: string;
    subscribedQualities: SubscribedQuality[];
    subscribedCodecs: SubscribedCodec[];
}
export interface TrackPermission {
    /** permission could be granted either by participant sid or identity */
    participantSid: string;
    allTracks: boolean;
    trackSids: string[];
    participantIdentity: string;
}
export interface SubscriptionPermission {
    allParticipants: boolean;
    trackPermissions: TrackPermission[];
}
export interface SubscriptionPermissionUpdate {
    participantSid: string;
    trackSid: string;
    allowed: boolean;
}
export interface SyncState {
    answer?: SessionDescription;
    subscription?: UpdateSubscription;
    publishTracks: TrackPublishedResponse[];
    dataChannels: DataChannelInfo[];
}
export interface DataChannelInfo {
    label: string;
    id: number;
    target: SignalTarget;
}
export interface SimulateScenario {
    /** simulate N seconds of speaker activity */
    speakerUpdate: number | undefined;
    /** simulate local node failure */
    nodeFailure: boolean | undefined;
    /** simulate migration */
    migration: boolean | undefined;
    /** server to send leave */
    serverLeave: boolean | undefined;
    /** switch candidate protocol to tcp */
    switchCandidateProtocol: CandidateProtocol | undefined;
}
export declare const SignalRequest: {
    encode(message: SignalRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignalRequest;
    fromJSON(object: any): SignalRequest;
    toJSON(message: SignalRequest): unknown;
    fromPartial<I extends {
        offer?: {
            type?: string | undefined;
            sdp?: string | undefined;
        } | undefined;
        answer?: {
            type?: string | undefined;
            sdp?: string | undefined;
        } | undefined;
        trickle?: {
            candidateInit?: string | undefined;
            target?: SignalTarget | undefined;
        } | undefined;
        addTrack?: {
            cid?: string | undefined;
            name?: string | undefined;
            type?: TrackType | undefined;
            width?: number | undefined;
            height?: number | undefined;
            muted?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] | undefined;
            simulcastCodecs?: {
                codec?: string | undefined;
                cid?: string | undefined;
                enableSimulcastLayers?: boolean | undefined;
            }[] | undefined;
            sid?: string | undefined;
        } | undefined;
        mute?: {
            sid?: string | undefined;
            muted?: boolean | undefined;
        } | undefined;
        subscription?: {
            trackSids?: string[] | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] | undefined;
        } | undefined;
        trackSetting?: {
            trackSids?: string[] | undefined;
            disabled?: boolean | undefined;
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } | undefined;
        leave?: {
            canReconnect?: boolean | undefined;
        } | undefined;
        updateLayers?: {
            trackSid?: string | undefined;
            layers?: {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] | undefined;
        } | undefined;
        subscriptionPermission?: {
            allParticipants?: boolean | undefined;
            trackPermissions?: {
                participantSid?: string | undefined;
                allTracks?: boolean | undefined;
                trackSids?: string[] | undefined;
                participantIdentity?: string | undefined;
            }[] | undefined;
        } | undefined;
        syncState?: {
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
            subscription?: {
                trackSids?: string[] | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] | undefined;
            } | undefined;
            publishTracks?: {
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                } | undefined;
            }[] | undefined;
            dataChannels?: {
                label?: string | undefined;
                id?: number | undefined;
                target?: SignalTarget | undefined;
            }[] | undefined;
        } | undefined;
        simulate?: {
            speakerUpdate?: number | undefined;
            nodeFailure?: boolean | undefined;
            migration?: boolean | undefined;
            serverLeave?: boolean | undefined;
            switchCandidateProtocol?: CandidateProtocol | undefined;
        } | undefined;
    } & {
        offer?: ({
            type?: string | undefined;
            sdp?: string | undefined;
        } & {
            type?: string | undefined;
            sdp?: string | undefined;
        } & Record<Exclude<keyof I["offer"], keyof SessionDescription>, never>) | undefined;
        answer?: ({
            type?: string | undefined;
            sdp?: string | undefined;
        } & {
            type?: string | undefined;
            sdp?: string | undefined;
        } & Record<Exclude<keyof I["answer"], keyof SessionDescription>, never>) | undefined;
        trickle?: ({
            candidateInit?: string | undefined;
            target?: SignalTarget | undefined;
        } & {
            candidateInit?: string | undefined;
            target?: SignalTarget | undefined;
        } & Record<Exclude<keyof I["trickle"], keyof TrickleRequest>, never>) | undefined;
        addTrack?: ({
            cid?: string | undefined;
            name?: string | undefined;
            type?: TrackType | undefined;
            width?: number | undefined;
            height?: number | undefined;
            muted?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] | undefined;
            simulcastCodecs?: {
                codec?: string | undefined;
                cid?: string | undefined;
                enableSimulcastLayers?: boolean | undefined;
            }[] | undefined;
            sid?: string | undefined;
        } & {
            cid?: string | undefined;
            name?: string | undefined;
            type?: TrackType | undefined;
            width?: number | undefined;
            height?: number | undefined;
            muted?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: ({
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] & ({
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            } & {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            } & Record<Exclude<keyof I["addTrack"]["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["addTrack"]["layers"], number | keyof {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[]>, never>) | undefined;
            simulcastCodecs?: ({
                codec?: string | undefined;
                cid?: string | undefined;
                enableSimulcastLayers?: boolean | undefined;
            }[] & ({
                codec?: string | undefined;
                cid?: string | undefined;
                enableSimulcastLayers?: boolean | undefined;
            } & {
                codec?: string | undefined;
                cid?: string | undefined;
                enableSimulcastLayers?: boolean | undefined;
            } & Record<Exclude<keyof I["addTrack"]["simulcastCodecs"][number], keyof SimulcastCodec>, never>)[] & Record<Exclude<keyof I["addTrack"]["simulcastCodecs"], number | keyof {
                codec?: string | undefined;
                cid?: string | undefined;
                enableSimulcastLayers?: boolean | undefined;
            }[]>, never>) | undefined;
            sid?: string | undefined;
        } & Record<Exclude<keyof I["addTrack"], keyof AddTrackRequest>, never>) | undefined;
        mute?: ({
            sid?: string | undefined;
            muted?: boolean | undefined;
        } & {
            sid?: string | undefined;
            muted?: boolean | undefined;
        } & Record<Exclude<keyof I["mute"], keyof MuteTrackRequest>, never>) | undefined;
        subscription?: ({
            trackSids?: string[] | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] | undefined;
        } & {
            trackSids?: (string[] & string[] & Record<Exclude<keyof I["subscription"]["trackSids"], number | keyof string[]>, never>) | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: ({
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] & ({
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            } & {
                participantSid?: string | undefined;
                trackSids?: (string[] & string[] & Record<Exclude<keyof I["subscription"]["participantTracks"][number]["trackSids"], number | keyof string[]>, never>) | undefined;
            } & Record<Exclude<keyof I["subscription"]["participantTracks"][number], keyof ParticipantTracks>, never>)[] & Record<Exclude<keyof I["subscription"]["participantTracks"], number | keyof {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["subscription"], keyof UpdateSubscription>, never>) | undefined;
        trackSetting?: ({
            trackSids?: string[] | undefined;
            disabled?: boolean | undefined;
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } & {
            trackSids?: (string[] & string[] & Record<Exclude<keyof I["trackSetting"]["trackSids"], number | keyof string[]>, never>) | undefined;
            disabled?: boolean | undefined;
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
        } & Record<Exclude<keyof I["trackSetting"], keyof UpdateTrackSettings>, never>) | undefined;
        leave?: ({
            canReconnect?: boolean | undefined;
        } & {
            canReconnect?: boolean | undefined;
        } & Record<Exclude<keyof I["leave"], "canReconnect">, never>) | undefined;
        updateLayers?: ({
            trackSid?: string | undefined;
            layers?: {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] | undefined;
        } & {
            trackSid?: string | undefined;
            layers?: ({
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] & ({
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            } & {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            } & Record<Exclude<keyof I["updateLayers"]["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["updateLayers"]["layers"], number | keyof {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["updateLayers"], keyof UpdateVideoLayers>, never>) | undefined;
        subscriptionPermission?: ({
            allParticipants?: boolean | undefined;
            trackPermissions?: {
                participantSid?: string | undefined;
                allTracks?: boolean | undefined;
                trackSids?: string[] | undefined;
                participantIdentity?: string | undefined;
            }[] | undefined;
        } & {
            allParticipants?: boolean | undefined;
            trackPermissions?: ({
                participantSid?: string | undefined;
                allTracks?: boolean | undefined;
                trackSids?: string[] | undefined;
                participantIdentity?: string | undefined;
            }[] & ({
                participantSid?: string | undefined;
                allTracks?: boolean | undefined;
                trackSids?: string[] | undefined;
                participantIdentity?: string | undefined;
            } & {
                participantSid?: string | undefined;
                allTracks?: boolean | undefined;
                trackSids?: (string[] & string[] & Record<Exclude<keyof I["subscriptionPermission"]["trackPermissions"][number]["trackSids"], number | keyof string[]>, never>) | undefined;
                participantIdentity?: string | undefined;
            } & Record<Exclude<keyof I["subscriptionPermission"]["trackPermissions"][number], keyof TrackPermission>, never>)[] & Record<Exclude<keyof I["subscriptionPermission"]["trackPermissions"], number | keyof {
                participantSid?: string | undefined;
                allTracks?: boolean | undefined;
                trackSids?: string[] | undefined;
                participantIdentity?: string | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["subscriptionPermission"], keyof SubscriptionPermission>, never>) | undefined;
        syncState?: ({
            answer?: {
                type?: string | undefined;
                sdp?: string | undefined;
            } | undefined;
            subscription?: {
                trackSids?: string[] | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] | undefined;
            } | undefined;
            publishTracks?: {
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                } | undefined;
            }[] | undefined;
            dataChannels?: {
                label?: string | undefined;
                id?: number | undefined;
                target?: SignalTarget | undefined;
            }[] | undefined;
        } & {
            answer?: ({
                type?: string | undefined;
                sdp?: string | undefined;
            } & {
                type?: string | undefined;
                sdp?: string | undefined;
            } & Record<Exclude<keyof I["syncState"]["answer"], keyof SessionDescription>, never>) | undefined;
            subscription?: ({
                trackSids?: string[] | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] | undefined;
            } & {
                trackSids?: (string[] & string[] & Record<Exclude<keyof I["syncState"]["subscription"]["trackSids"], number | keyof string[]>, never>) | undefined;
                subscribe?: boolean | undefined;
                participantTracks?: ({
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[] & ({
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                } & {
                    participantSid?: string | undefined;
                    trackSids?: (string[] & string[] & Record<Exclude<keyof I["syncState"]["subscription"]["participantTracks"][number]["trackSids"], number | keyof string[]>, never>) | undefined;
                } & Record<Exclude<keyof I["syncState"]["subscription"]["participantTracks"][number], keyof ParticipantTracks>, never>)[] & Record<Exclude<keyof I["syncState"]["subscription"]["participantTracks"], number | keyof {
                    participantSid?: string | undefined;
                    trackSids?: string[] | undefined;
                }[]>, never>) | undefined;
            } & Record<Exclude<keyof I["syncState"]["subscription"], keyof UpdateSubscription>, never>) | undefined;
            publishTracks?: ({
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                } | undefined;
            }[] & ({
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                } | undefined;
            } & {
                cid?: string | undefined;
                track?: ({
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                } & {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & Record<Exclude<keyof I["syncState"]["publishTracks"][number]["track"]["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["syncState"]["publishTracks"][number]["track"]["layers"], number | keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>, never>) | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] & ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    } & {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    } & Record<Exclude<keyof I["syncState"]["publishTracks"][number]["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>, never>)[] & Record<Exclude<keyof I["syncState"]["publishTracks"][number]["track"]["codecs"], number | keyof {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[]>, never>) | undefined;
                } & Record<Exclude<keyof I["syncState"]["publishTracks"][number]["track"], keyof TrackInfo>, never>) | undefined;
            } & Record<Exclude<keyof I["syncState"]["publishTracks"][number], keyof TrackPublishedResponse>, never>)[] & Record<Exclude<keyof I["syncState"]["publishTracks"], number | keyof {
                cid?: string | undefined;
                track?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                } | undefined;
            }[]>, never>) | undefined;
            dataChannels?: ({
                label?: string | undefined;
                id?: number | undefined;
                target?: SignalTarget | undefined;
            }[] & ({
                label?: string | undefined;
                id?: number | undefined;
                target?: SignalTarget | undefined;
            } & {
                label?: string | undefined;
                id?: number | undefined;
                target?: SignalTarget | undefined;
            } & Record<Exclude<keyof I["syncState"]["dataChannels"][number], keyof DataChannelInfo>, never>)[] & Record<Exclude<keyof I["syncState"]["dataChannels"], number | keyof {
                label?: string | undefined;
                id?: number | undefined;
                target?: SignalTarget | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["syncState"], keyof SyncState>, never>) | undefined;
        simulate?: ({
            speakerUpdate?: number | undefined;
            nodeFailure?: boolean | undefined;
            migration?: boolean | undefined;
            serverLeave?: boolean | undefined;
            switchCandidateProtocol?: CandidateProtocol | undefined;
        } & {
            speakerUpdate?: number | undefined;
            nodeFailure?: boolean | undefined;
            migration?: boolean | undefined;
            serverLeave?: boolean | undefined;
            switchCandidateProtocol?: CandidateProtocol | undefined;
        } & Record<Exclude<keyof I["simulate"], keyof SimulateScenario>, never>) | undefined;
    } & Record<Exclude<keyof I, keyof SignalRequest>, never>>(object: I): SignalRequest;
};
export declare const SignalResponse: {
    encode(message: SignalResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SignalResponse;
    fromJSON(object: any): SignalResponse;
    toJSON(message: SignalResponse): unknown;
    fromPartial<I extends {
        join?: {
            room?: {
                sid?: string | undefined;
                name?: string | undefined;
                emptyTimeout?: number | undefined;
                maxParticipants?: number | undefined;
                creationTime?: number | undefined;
                turnPassword?: string | undefined;
                enabledCodecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                numParticipants?: number | undefined;
                activeRecording?: boolean | undefined;
            } | undefined;
            participant?: {
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            } | undefined;
            otherParticipants?: {
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            }[] | undefined;
            serverVersion?: string | undefined;
            iceServers?: {
                urls?: string[] | undefined;
                username?: string | undefined;
                credential?: string | undefined;
            }[] | undefined;
            subscriberPrimary?: boolean | undefined;
            alternativeUrl?: string | undefined;
            clientConfiguration?: {
                video?: {
                    hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                screen?: {
                    hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            serverRegion?: string | undefined;
        } | undefined;
        answer?: {
            type?: string | undefined;
            sdp?: string | undefined;
        } | undefined;
        offer?: {
            type?: string | undefined;
            sdp?: string | undefined;
        } | undefined;
        trickle?: {
            candidateInit?: string | undefined;
            target?: SignalTarget | undefined;
        } | undefined;
        update?: {
            participants?: {
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            }[] | undefined;
        } | undefined;
        trackPublished?: {
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            } | undefined;
        } | undefined;
        leave?: {
            canReconnect?: boolean | undefined;
        } | undefined;
        mute?: {
            sid?: string | undefined;
            muted?: boolean | undefined;
        } | undefined;
        speakersChanged?: {
            speakers?: {
                sid?: string | undefined;
                level?: number | undefined;
                active?: boolean | undefined;
            }[] | undefined;
        } | undefined;
        roomUpdate?: {
            room?: {
                sid?: string | undefined;
                name?: string | undefined;
                emptyTimeout?: number | undefined;
                maxParticipants?: number | undefined;
                creationTime?: number | undefined;
                turnPassword?: string | undefined;
                enabledCodecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                numParticipants?: number | undefined;
                activeRecording?: boolean | undefined;
            } | undefined;
        } | undefined;
        connectionQuality?: {
            updates?: {
                participantSid?: string | undefined;
                quality?: ConnectionQuality | undefined;
                score?: number | undefined;
            }[] | undefined;
        } | undefined;
        streamStateUpdate?: {
            streamStates?: {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                state?: StreamState | undefined;
            }[] | undefined;
        } | undefined;
        subscribedQualityUpdate?: {
            trackSid?: string | undefined;
            subscribedQualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            subscribedCodecs?: {
                codec?: string | undefined;
                qualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } | undefined;
        subscriptionPermissionUpdate?: {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            allowed?: boolean | undefined;
        } | undefined;
        refreshToken?: string | undefined;
        trackUnpublished?: {
            trackSid?: string | undefined;
        } | undefined;
    } & {
        join?: ({
            room?: {
                sid?: string | undefined;
                name?: string | undefined;
                emptyTimeout?: number | undefined;
                maxParticipants?: number | undefined;
                creationTime?: number | undefined;
                turnPassword?: string | undefined;
                enabledCodecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                numParticipants?: number | undefined;
                activeRecording?: boolean | undefined;
            } | undefined;
            participant?: {
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            } | undefined;
            otherParticipants?: {
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            }[] | undefined;
            serverVersion?: string | undefined;
            iceServers?: {
                urls?: string[] | undefined;
                username?: string | undefined;
                credential?: string | undefined;
            }[] | undefined;
            subscriberPrimary?: boolean | undefined;
            alternativeUrl?: string | undefined;
            clientConfiguration?: {
                video?: {
                    hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                screen?: {
                    hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            serverRegion?: string | undefined;
        } & {
            room?: ({
                sid?: string | undefined;
                name?: string | undefined;
                emptyTimeout?: number | undefined;
                maxParticipants?: number | undefined;
                creationTime?: number | undefined;
                turnPassword?: string | undefined;
                enabledCodecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                numParticipants?: number | undefined;
                activeRecording?: boolean | undefined;
            } & {
                sid?: string | undefined;
                name?: string | undefined;
                emptyTimeout?: number | undefined;
                maxParticipants?: number | undefined;
                creationTime?: number | undefined;
                turnPassword?: string | undefined;
                enabledCodecs?: ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] & ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & Record<Exclude<keyof I["join"]["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>, never>)[] & Record<Exclude<keyof I["join"]["room"]["enabledCodecs"], number | keyof {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[]>, never>) | undefined;
                metadata?: string | undefined;
                numParticipants?: number | undefined;
                activeRecording?: boolean | undefined;
            } & Record<Exclude<keyof I["join"]["room"], keyof Room>, never>) | undefined;
            participant?: ({
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            } & {
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: ({
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] & ({
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                } & {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & Record<Exclude<keyof I["join"]["participant"]["tracks"][number]["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["join"]["participant"]["tracks"][number]["layers"], number | keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>, never>) | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] & ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    } & {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    } & Record<Exclude<keyof I["join"]["participant"]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>, never>)[] & Record<Exclude<keyof I["join"]["participant"]["tracks"][number]["codecs"], number | keyof {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[]>, never>) | undefined;
                } & Record<Exclude<keyof I["join"]["participant"]["tracks"][number], keyof TrackInfo>, never>)[] & Record<Exclude<keyof I["join"]["participant"]["tracks"], number | keyof {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[]>, never>) | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: ({
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } & {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } & Record<Exclude<keyof I["join"]["participant"]["permission"], keyof import("./livekit_models").ParticipantPermission>, never>) | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            } & Record<Exclude<keyof I["join"]["participant"], keyof ParticipantInfo>, never>) | undefined;
            otherParticipants?: ({
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            }[] & ({
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            } & {
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: ({
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] & ({
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                } & {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & Record<Exclude<keyof I["join"]["otherParticipants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["join"]["otherParticipants"][number]["tracks"][number]["layers"], number | keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>, never>) | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] & ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    } & {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    } & Record<Exclude<keyof I["join"]["otherParticipants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>, never>)[] & Record<Exclude<keyof I["join"]["otherParticipants"][number]["tracks"][number]["codecs"], number | keyof {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[]>, never>) | undefined;
                } & Record<Exclude<keyof I["join"]["otherParticipants"][number]["tracks"][number], keyof TrackInfo>, never>)[] & Record<Exclude<keyof I["join"]["otherParticipants"][number]["tracks"], number | keyof {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[]>, never>) | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: ({
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } & {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } & Record<Exclude<keyof I["join"]["otherParticipants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>, never>) | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            } & Record<Exclude<keyof I["join"]["otherParticipants"][number], keyof ParticipantInfo>, never>)[] & Record<Exclude<keyof I["join"]["otherParticipants"], number | keyof {
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            }[]>, never>) | undefined;
            serverVersion?: string | undefined;
            iceServers?: ({
                urls?: string[] | undefined;
                username?: string | undefined;
                credential?: string | undefined;
            }[] & ({
                urls?: string[] | undefined;
                username?: string | undefined;
                credential?: string | undefined;
            } & {
                urls?: (string[] & string[] & Record<Exclude<keyof I["join"]["iceServers"][number]["urls"], number | keyof string[]>, never>) | undefined;
                username?: string | undefined;
                credential?: string | undefined;
            } & Record<Exclude<keyof I["join"]["iceServers"][number], keyof ICEServer>, never>)[] & Record<Exclude<keyof I["join"]["iceServers"], number | keyof {
                urls?: string[] | undefined;
                username?: string | undefined;
                credential?: string | undefined;
            }[]>, never>) | undefined;
            subscriberPrimary?: boolean | undefined;
            alternativeUrl?: string | undefined;
            clientConfiguration?: ({
                video?: {
                    hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                screen?: {
                    hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                } | undefined;
                resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                video?: ({
                    hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                } & {
                    hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                } & Record<Exclude<keyof I["join"]["clientConfiguration"]["video"], "hardwareEncoder">, never>) | undefined;
                screen?: ({
                    hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                } & {
                    hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
                } & Record<Exclude<keyof I["join"]["clientConfiguration"]["screen"], "hardwareEncoder">, never>) | undefined;
                resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
            } & Record<Exclude<keyof I["join"]["clientConfiguration"], keyof ClientConfiguration>, never>) | undefined;
            serverRegion?: string | undefined;
        } & Record<Exclude<keyof I["join"], keyof JoinResponse>, never>) | undefined;
        answer?: ({
            type?: string | undefined;
            sdp?: string | undefined;
        } & {
            type?: string | undefined;
            sdp?: string | undefined;
        } & Record<Exclude<keyof I["answer"], keyof SessionDescription>, never>) | undefined;
        offer?: ({
            type?: string | undefined;
            sdp?: string | undefined;
        } & {
            type?: string | undefined;
            sdp?: string | undefined;
        } & Record<Exclude<keyof I["offer"], keyof SessionDescription>, never>) | undefined;
        trickle?: ({
            candidateInit?: string | undefined;
            target?: SignalTarget | undefined;
        } & {
            candidateInit?: string | undefined;
            target?: SignalTarget | undefined;
        } & Record<Exclude<keyof I["trickle"], keyof TrickleRequest>, never>) | undefined;
        update?: ({
            participants?: {
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            }[] | undefined;
        } & {
            participants?: ({
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            }[] & ({
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            } & {
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: ({
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] & ({
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                } & {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] & ({
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    } & Record<Exclude<keyof I["update"]["participants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["update"]["participants"][number]["tracks"][number]["layers"], number | keyof {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[]>, never>) | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] & ({
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    } & {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    } & Record<Exclude<keyof I["update"]["participants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>, never>)[] & Record<Exclude<keyof I["update"]["participants"][number]["tracks"][number]["codecs"], number | keyof {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[]>, never>) | undefined;
                } & Record<Exclude<keyof I["update"]["participants"][number]["tracks"][number], keyof TrackInfo>, never>)[] & Record<Exclude<keyof I["update"]["participants"][number]["tracks"], number | keyof {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[]>, never>) | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: ({
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } & {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } & Record<Exclude<keyof I["update"]["participants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>, never>) | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            } & Record<Exclude<keyof I["update"]["participants"][number], keyof ParticipantInfo>, never>)[] & Record<Exclude<keyof I["update"]["participants"], number | keyof {
                sid?: string | undefined;
                identity?: string | undefined;
                state?: import("./livekit_models").ParticipantInfo_State | undefined;
                tracks?: {
                    sid?: string | undefined;
                    type?: TrackType | undefined;
                    name?: string | undefined;
                    muted?: boolean | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    simulcast?: boolean | undefined;
                    disableDtx?: boolean | undefined;
                    source?: TrackSource | undefined;
                    layers?: {
                        quality?: VideoQuality | undefined;
                        width?: number | undefined;
                        height?: number | undefined;
                        bitrate?: number | undefined;
                        ssrc?: number | undefined;
                    }[] | undefined;
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    codecs?: {
                        mimeType?: string | undefined;
                        mid?: string | undefined;
                        cid?: string | undefined;
                    }[] | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                joinedAt?: number | undefined;
                name?: string | undefined;
                version?: number | undefined;
                permission?: {
                    canSubscribe?: boolean | undefined;
                    canPublish?: boolean | undefined;
                    canPublishData?: boolean | undefined;
                    hidden?: boolean | undefined;
                    recorder?: boolean | undefined;
                } | undefined;
                region?: string | undefined;
                isPublisher?: boolean | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["update"], "participants">, never>) | undefined;
        trackPublished?: ({
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            cid?: string | undefined;
            track?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & Record<Exclude<keyof I["trackPublished"]["track"]["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["trackPublished"]["track"]["layers"], number | keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>, never>) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                } & Record<Exclude<keyof I["trackPublished"]["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>, never>)[] & Record<Exclude<keyof I["trackPublished"]["track"]["codecs"], number | keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[]>, never>) | undefined;
            } & Record<Exclude<keyof I["trackPublished"]["track"], keyof TrackInfo>, never>) | undefined;
        } & Record<Exclude<keyof I["trackPublished"], keyof TrackPublishedResponse>, never>) | undefined;
        leave?: ({
            canReconnect?: boolean | undefined;
        } & {
            canReconnect?: boolean | undefined;
        } & Record<Exclude<keyof I["leave"], "canReconnect">, never>) | undefined;
        mute?: ({
            sid?: string | undefined;
            muted?: boolean | undefined;
        } & {
            sid?: string | undefined;
            muted?: boolean | undefined;
        } & Record<Exclude<keyof I["mute"], keyof MuteTrackRequest>, never>) | undefined;
        speakersChanged?: ({
            speakers?: {
                sid?: string | undefined;
                level?: number | undefined;
                active?: boolean | undefined;
            }[] | undefined;
        } & {
            speakers?: ({
                sid?: string | undefined;
                level?: number | undefined;
                active?: boolean | undefined;
            }[] & ({
                sid?: string | undefined;
                level?: number | undefined;
                active?: boolean | undefined;
            } & {
                sid?: string | undefined;
                level?: number | undefined;
                active?: boolean | undefined;
            } & Record<Exclude<keyof I["speakersChanged"]["speakers"][number], keyof SpeakerInfo>, never>)[] & Record<Exclude<keyof I["speakersChanged"]["speakers"], number | keyof {
                sid?: string | undefined;
                level?: number | undefined;
                active?: boolean | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["speakersChanged"], "speakers">, never>) | undefined;
        roomUpdate?: ({
            room?: {
                sid?: string | undefined;
                name?: string | undefined;
                emptyTimeout?: number | undefined;
                maxParticipants?: number | undefined;
                creationTime?: number | undefined;
                turnPassword?: string | undefined;
                enabledCodecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                numParticipants?: number | undefined;
                activeRecording?: boolean | undefined;
            } | undefined;
        } & {
            room?: ({
                sid?: string | undefined;
                name?: string | undefined;
                emptyTimeout?: number | undefined;
                maxParticipants?: number | undefined;
                creationTime?: number | undefined;
                turnPassword?: string | undefined;
                enabledCodecs?: {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] | undefined;
                metadata?: string | undefined;
                numParticipants?: number | undefined;
                activeRecording?: boolean | undefined;
            } & {
                sid?: string | undefined;
                name?: string | undefined;
                emptyTimeout?: number | undefined;
                maxParticipants?: number | undefined;
                creationTime?: number | undefined;
                turnPassword?: string | undefined;
                enabledCodecs?: ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[] & ({
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                } & Record<Exclude<keyof I["roomUpdate"]["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>, never>)[] & Record<Exclude<keyof I["roomUpdate"]["room"]["enabledCodecs"], number | keyof {
                    mime?: string | undefined;
                    fmtpLine?: string | undefined;
                }[]>, never>) | undefined;
                metadata?: string | undefined;
                numParticipants?: number | undefined;
                activeRecording?: boolean | undefined;
            } & Record<Exclude<keyof I["roomUpdate"]["room"], keyof Room>, never>) | undefined;
        } & Record<Exclude<keyof I["roomUpdate"], "room">, never>) | undefined;
        connectionQuality?: ({
            updates?: {
                participantSid?: string | undefined;
                quality?: ConnectionQuality | undefined;
                score?: number | undefined;
            }[] | undefined;
        } & {
            updates?: ({
                participantSid?: string | undefined;
                quality?: ConnectionQuality | undefined;
                score?: number | undefined;
            }[] & ({
                participantSid?: string | undefined;
                quality?: ConnectionQuality | undefined;
                score?: number | undefined;
            } & {
                participantSid?: string | undefined;
                quality?: ConnectionQuality | undefined;
                score?: number | undefined;
            } & Record<Exclude<keyof I["connectionQuality"]["updates"][number], keyof ConnectionQualityInfo>, never>)[] & Record<Exclude<keyof I["connectionQuality"]["updates"], number | keyof {
                participantSid?: string | undefined;
                quality?: ConnectionQuality | undefined;
                score?: number | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["connectionQuality"], "updates">, never>) | undefined;
        streamStateUpdate?: ({
            streamStates?: {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                state?: StreamState | undefined;
            }[] | undefined;
        } & {
            streamStates?: ({
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                state?: StreamState | undefined;
            }[] & ({
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                state?: StreamState | undefined;
            } & {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                state?: StreamState | undefined;
            } & Record<Exclude<keyof I["streamStateUpdate"]["streamStates"][number], keyof StreamStateInfo>, never>)[] & Record<Exclude<keyof I["streamStateUpdate"]["streamStates"], number | keyof {
                participantSid?: string | undefined;
                trackSid?: string | undefined;
                state?: StreamState | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["streamStateUpdate"], "streamStates">, never>) | undefined;
        subscribedQualityUpdate?: ({
            trackSid?: string | undefined;
            subscribedQualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            subscribedCodecs?: {
                codec?: string | undefined;
                qualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            trackSid?: string | undefined;
            subscribedQualities?: ({
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] & ({
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            } & {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            } & Record<Exclude<keyof I["subscribedQualityUpdate"]["subscribedQualities"][number], keyof SubscribedQuality>, never>)[] & Record<Exclude<keyof I["subscribedQualityUpdate"]["subscribedQualities"], number | keyof {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[]>, never>) | undefined;
            subscribedCodecs?: ({
                codec?: string | undefined;
                qualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            }[] & ({
                codec?: string | undefined;
                qualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            } & {
                codec?: string | undefined;
                qualities?: ({
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                } & Record<Exclude<keyof I["subscribedQualityUpdate"]["subscribedCodecs"][number]["qualities"][number], keyof SubscribedQuality>, never>)[] & Record<Exclude<keyof I["subscribedQualityUpdate"]["subscribedCodecs"][number]["qualities"], number | keyof {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[]>, never>) | undefined;
            } & Record<Exclude<keyof I["subscribedQualityUpdate"]["subscribedCodecs"][number], keyof SubscribedCodec>, never>)[] & Record<Exclude<keyof I["subscribedQualityUpdate"]["subscribedCodecs"], number | keyof {
                codec?: string | undefined;
                qualities?: {
                    quality?: VideoQuality | undefined;
                    enabled?: boolean | undefined;
                }[] | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["subscribedQualityUpdate"], keyof SubscribedQualityUpdate>, never>) | undefined;
        subscriptionPermissionUpdate?: ({
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            allowed?: boolean | undefined;
        } & {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            allowed?: boolean | undefined;
        } & Record<Exclude<keyof I["subscriptionPermissionUpdate"], keyof SubscriptionPermissionUpdate>, never>) | undefined;
        refreshToken?: string | undefined;
        trackUnpublished?: ({
            trackSid?: string | undefined;
        } & {
            trackSid?: string | undefined;
        } & Record<Exclude<keyof I["trackUnpublished"], "trackSid">, never>) | undefined;
    } & Record<Exclude<keyof I, keyof SignalResponse>, never>>(object: I): SignalResponse;
};
export declare const SimulcastCodec: {
    encode(message: SimulcastCodec, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SimulcastCodec;
    fromJSON(object: any): SimulcastCodec;
    toJSON(message: SimulcastCodec): unknown;
    fromPartial<I extends {
        codec?: string | undefined;
        cid?: string | undefined;
        enableSimulcastLayers?: boolean | undefined;
    } & {
        codec?: string | undefined;
        cid?: string | undefined;
        enableSimulcastLayers?: boolean | undefined;
    } & Record<Exclude<keyof I, keyof SimulcastCodec>, never>>(object: I): SimulcastCodec;
};
export declare const AddTrackRequest: {
    encode(message: AddTrackRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): AddTrackRequest;
    fromJSON(object: any): AddTrackRequest;
    toJSON(message: AddTrackRequest): unknown;
    fromPartial<I extends {
        cid?: string | undefined;
        name?: string | undefined;
        type?: TrackType | undefined;
        width?: number | undefined;
        height?: number | undefined;
        muted?: boolean | undefined;
        disableDtx?: boolean | undefined;
        source?: TrackSource | undefined;
        layers?: {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] | undefined;
        simulcastCodecs?: {
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        }[] | undefined;
        sid?: string | undefined;
    } & {
        cid?: string | undefined;
        name?: string | undefined;
        type?: TrackType | undefined;
        width?: number | undefined;
        height?: number | undefined;
        muted?: boolean | undefined;
        disableDtx?: boolean | undefined;
        source?: TrackSource | undefined;
        layers?: ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & Record<Exclude<keyof I["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["layers"], number | keyof {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[]>, never>) | undefined;
        simulcastCodecs?: ({
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        }[] & ({
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        } & {
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        } & Record<Exclude<keyof I["simulcastCodecs"][number], keyof SimulcastCodec>, never>)[] & Record<Exclude<keyof I["simulcastCodecs"], number | keyof {
            codec?: string | undefined;
            cid?: string | undefined;
            enableSimulcastLayers?: boolean | undefined;
        }[]>, never>) | undefined;
        sid?: string | undefined;
    } & Record<Exclude<keyof I, keyof AddTrackRequest>, never>>(object: I): AddTrackRequest;
};
export declare const TrickleRequest: {
    encode(message: TrickleRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TrickleRequest;
    fromJSON(object: any): TrickleRequest;
    toJSON(message: TrickleRequest): unknown;
    fromPartial<I extends {
        candidateInit?: string | undefined;
        target?: SignalTarget | undefined;
    } & {
        candidateInit?: string | undefined;
        target?: SignalTarget | undefined;
    } & Record<Exclude<keyof I, keyof TrickleRequest>, never>>(object: I): TrickleRequest;
};
export declare const MuteTrackRequest: {
    encode(message: MuteTrackRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): MuteTrackRequest;
    fromJSON(object: any): MuteTrackRequest;
    toJSON(message: MuteTrackRequest): unknown;
    fromPartial<I extends {
        sid?: string | undefined;
        muted?: boolean | undefined;
    } & {
        sid?: string | undefined;
        muted?: boolean | undefined;
    } & Record<Exclude<keyof I, keyof MuteTrackRequest>, never>>(object: I): MuteTrackRequest;
};
export declare const JoinResponse: {
    encode(message: JoinResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): JoinResponse;
    fromJSON(object: any): JoinResponse;
    toJSON(message: JoinResponse): unknown;
    fromPartial<I extends {
        room?: {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            activeRecording?: boolean | undefined;
        } | undefined;
        participant?: {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } | undefined;
        otherParticipants?: {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] | undefined;
        serverVersion?: string | undefined;
        iceServers?: {
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[] | undefined;
        subscriberPrimary?: boolean | undefined;
        alternativeUrl?: string | undefined;
        clientConfiguration?: {
            video?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            screen?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
        } | undefined;
        serverRegion?: string | undefined;
    } & {
        room?: ({
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            activeRecording?: boolean | undefined;
        } & {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] & ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & Record<Exclude<keyof I["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>, never>)[] & Record<Exclude<keyof I["room"]["enabledCodecs"], number | keyof {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[]>, never>) | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            activeRecording?: boolean | undefined;
        } & Record<Exclude<keyof I["room"], keyof Room>, never>) | undefined;
        participant?: ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] & ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & Record<Exclude<keyof I["participant"]["tracks"][number]["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["participant"]["tracks"][number]["layers"], number | keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>, never>) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                } & Record<Exclude<keyof I["participant"]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>, never>)[] & Record<Exclude<keyof I["participant"]["tracks"][number]["codecs"], number | keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[]>, never>) | undefined;
            } & Record<Exclude<keyof I["participant"]["tracks"][number], keyof TrackInfo>, never>)[] & Record<Exclude<keyof I["participant"]["tracks"], number | keyof {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[]>, never>) | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: ({
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } & {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } & Record<Exclude<keyof I["participant"]["permission"], keyof import("./livekit_models").ParticipantPermission>, never>) | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & Record<Exclude<keyof I["participant"], keyof ParticipantInfo>, never>) | undefined;
        otherParticipants?: ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] & ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] & ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & Record<Exclude<keyof I["otherParticipants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["otherParticipants"][number]["tracks"][number]["layers"], number | keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>, never>) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                } & Record<Exclude<keyof I["otherParticipants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>, never>)[] & Record<Exclude<keyof I["otherParticipants"][number]["tracks"][number]["codecs"], number | keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[]>, never>) | undefined;
            } & Record<Exclude<keyof I["otherParticipants"][number]["tracks"][number], keyof TrackInfo>, never>)[] & Record<Exclude<keyof I["otherParticipants"][number]["tracks"], number | keyof {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[]>, never>) | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: ({
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } & {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } & Record<Exclude<keyof I["otherParticipants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>, never>) | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & Record<Exclude<keyof I["otherParticipants"][number], keyof ParticipantInfo>, never>)[] & Record<Exclude<keyof I["otherParticipants"], number | keyof {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[]>, never>) | undefined;
        serverVersion?: string | undefined;
        iceServers?: ({
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[] & ({
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        } & {
            urls?: (string[] & string[] & Record<Exclude<keyof I["iceServers"][number]["urls"], number | keyof string[]>, never>) | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        } & Record<Exclude<keyof I["iceServers"][number], keyof ICEServer>, never>)[] & Record<Exclude<keyof I["iceServers"], number | keyof {
            urls?: string[] | undefined;
            username?: string | undefined;
            credential?: string | undefined;
        }[]>, never>) | undefined;
        subscriberPrimary?: boolean | undefined;
        alternativeUrl?: string | undefined;
        clientConfiguration?: ({
            video?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            screen?: {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
        } & {
            video?: ({
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & Record<Exclude<keyof I["clientConfiguration"]["video"], "hardwareEncoder">, never>) | undefined;
            screen?: ({
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & {
                hardwareEncoder?: import("./livekit_models").ClientConfigSetting | undefined;
            } & Record<Exclude<keyof I["clientConfiguration"]["screen"], "hardwareEncoder">, never>) | undefined;
            resumeConnection?: import("./livekit_models").ClientConfigSetting | undefined;
        } & Record<Exclude<keyof I["clientConfiguration"], keyof ClientConfiguration>, never>) | undefined;
        serverRegion?: string | undefined;
    } & Record<Exclude<keyof I, keyof JoinResponse>, never>>(object: I): JoinResponse;
};
export declare const TrackPublishedResponse: {
    encode(message: TrackPublishedResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TrackPublishedResponse;
    fromJSON(object: any): TrackPublishedResponse;
    toJSON(message: TrackPublishedResponse): unknown;
    fromPartial<I extends {
        cid?: string | undefined;
        track?: {
            sid?: string | undefined;
            type?: TrackType | undefined;
            name?: string | undefined;
            muted?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            simulcast?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] | undefined;
            mimeType?: string | undefined;
            mid?: string | undefined;
            codecs?: {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
            }[] | undefined;
        } | undefined;
    } & {
        cid?: string | undefined;
        track?: ({
            sid?: string | undefined;
            type?: TrackType | undefined;
            name?: string | undefined;
            muted?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            simulcast?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] | undefined;
            mimeType?: string | undefined;
            mid?: string | undefined;
            codecs?: {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
            }[] | undefined;
        } & {
            sid?: string | undefined;
            type?: TrackType | undefined;
            name?: string | undefined;
            muted?: boolean | undefined;
            width?: number | undefined;
            height?: number | undefined;
            simulcast?: boolean | undefined;
            disableDtx?: boolean | undefined;
            source?: TrackSource | undefined;
            layers?: ({
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[] & ({
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            } & {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            } & Record<Exclude<keyof I["track"]["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["track"]["layers"], number | keyof {
                quality?: VideoQuality | undefined;
                width?: number | undefined;
                height?: number | undefined;
                bitrate?: number | undefined;
                ssrc?: number | undefined;
            }[]>, never>) | undefined;
            mimeType?: string | undefined;
            mid?: string | undefined;
            codecs?: ({
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
            }[] & ({
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
            } & {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
            } & Record<Exclude<keyof I["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>, never>)[] & Record<Exclude<keyof I["track"]["codecs"], number | keyof {
                mimeType?: string | undefined;
                mid?: string | undefined;
                cid?: string | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["track"], keyof TrackInfo>, never>) | undefined;
    } & Record<Exclude<keyof I, keyof TrackPublishedResponse>, never>>(object: I): TrackPublishedResponse;
};
export declare const TrackUnpublishedResponse: {
    encode(message: TrackUnpublishedResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TrackUnpublishedResponse;
    fromJSON(object: any): TrackUnpublishedResponse;
    toJSON(message: TrackUnpublishedResponse): unknown;
    fromPartial<I extends {
        trackSid?: string | undefined;
    } & {
        trackSid?: string | undefined;
    } & Record<Exclude<keyof I, "trackSid">, never>>(object: I): TrackUnpublishedResponse;
};
export declare const SessionDescription: {
    encode(message: SessionDescription, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SessionDescription;
    fromJSON(object: any): SessionDescription;
    toJSON(message: SessionDescription): unknown;
    fromPartial<I extends {
        type?: string | undefined;
        sdp?: string | undefined;
    } & {
        type?: string | undefined;
        sdp?: string | undefined;
    } & Record<Exclude<keyof I, keyof SessionDescription>, never>>(object: I): SessionDescription;
};
export declare const ParticipantUpdate: {
    encode(message: ParticipantUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ParticipantUpdate;
    fromJSON(object: any): ParticipantUpdate;
    toJSON(message: ParticipantUpdate): unknown;
    fromPartial<I extends {
        participants?: {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] | undefined;
    } & {
        participants?: ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[] & ({
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] & ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & Record<Exclude<keyof I["participants"][number]["tracks"][number]["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["participants"][number]["tracks"][number]["layers"], number | keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>, never>) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                } & Record<Exclude<keyof I["participants"][number]["tracks"][number]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>, never>)[] & Record<Exclude<keyof I["participants"][number]["tracks"][number]["codecs"], number | keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[]>, never>) | undefined;
            } & Record<Exclude<keyof I["participants"][number]["tracks"][number], keyof TrackInfo>, never>)[] & Record<Exclude<keyof I["participants"][number]["tracks"], number | keyof {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[]>, never>) | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: ({
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } & {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } & Record<Exclude<keyof I["participants"][number]["permission"], keyof import("./livekit_models").ParticipantPermission>, never>) | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        } & Record<Exclude<keyof I["participants"][number], keyof ParticipantInfo>, never>)[] & Record<Exclude<keyof I["participants"], number | keyof {
            sid?: string | undefined;
            identity?: string | undefined;
            state?: import("./livekit_models").ParticipantInfo_State | undefined;
            tracks?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            joinedAt?: number | undefined;
            name?: string | undefined;
            version?: number | undefined;
            permission?: {
                canSubscribe?: boolean | undefined;
                canPublish?: boolean | undefined;
                canPublishData?: boolean | undefined;
                hidden?: boolean | undefined;
                recorder?: boolean | undefined;
            } | undefined;
            region?: string | undefined;
            isPublisher?: boolean | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "participants">, never>>(object: I): ParticipantUpdate;
};
export declare const UpdateSubscription: {
    encode(message: UpdateSubscription, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateSubscription;
    fromJSON(object: any): UpdateSubscription;
    toJSON(message: UpdateSubscription): unknown;
    fromPartial<I extends {
        trackSids?: string[] | undefined;
        subscribe?: boolean | undefined;
        participantTracks?: {
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        }[] | undefined;
    } & {
        trackSids?: (string[] & string[] & Record<Exclude<keyof I["trackSids"], number | keyof string[]>, never>) | undefined;
        subscribe?: boolean | undefined;
        participantTracks?: ({
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        }[] & ({
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        } & {
            participantSid?: string | undefined;
            trackSids?: (string[] & string[] & Record<Exclude<keyof I["participantTracks"][number]["trackSids"], number | keyof string[]>, never>) | undefined;
        } & Record<Exclude<keyof I["participantTracks"][number], keyof ParticipantTracks>, never>)[] & Record<Exclude<keyof I["participantTracks"], number | keyof {
            participantSid?: string | undefined;
            trackSids?: string[] | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, keyof UpdateSubscription>, never>>(object: I): UpdateSubscription;
};
export declare const UpdateTrackSettings: {
    encode(message: UpdateTrackSettings, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateTrackSettings;
    fromJSON(object: any): UpdateTrackSettings;
    toJSON(message: UpdateTrackSettings): unknown;
    fromPartial<I extends {
        trackSids?: string[] | undefined;
        disabled?: boolean | undefined;
        quality?: VideoQuality | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & {
        trackSids?: (string[] & string[] & Record<Exclude<keyof I["trackSids"], number | keyof string[]>, never>) | undefined;
        disabled?: boolean | undefined;
        quality?: VideoQuality | undefined;
        width?: number | undefined;
        height?: number | undefined;
    } & Record<Exclude<keyof I, keyof UpdateTrackSettings>, never>>(object: I): UpdateTrackSettings;
};
export declare const LeaveRequest: {
    encode(message: LeaveRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): LeaveRequest;
    fromJSON(object: any): LeaveRequest;
    toJSON(message: LeaveRequest): unknown;
    fromPartial<I extends {
        canReconnect?: boolean | undefined;
    } & {
        canReconnect?: boolean | undefined;
    } & Record<Exclude<keyof I, "canReconnect">, never>>(object: I): LeaveRequest;
};
export declare const UpdateVideoLayers: {
    encode(message: UpdateVideoLayers, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): UpdateVideoLayers;
    fromJSON(object: any): UpdateVideoLayers;
    toJSON(message: UpdateVideoLayers): unknown;
    fromPartial<I extends {
        trackSid?: string | undefined;
        layers?: {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] | undefined;
    } & {
        trackSid?: string | undefined;
        layers?: ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        } & Record<Exclude<keyof I["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["layers"], number | keyof {
            quality?: VideoQuality | undefined;
            width?: number | undefined;
            height?: number | undefined;
            bitrate?: number | undefined;
            ssrc?: number | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, keyof UpdateVideoLayers>, never>>(object: I): UpdateVideoLayers;
};
export declare const ICEServer: {
    encode(message: ICEServer, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ICEServer;
    fromJSON(object: any): ICEServer;
    toJSON(message: ICEServer): unknown;
    fromPartial<I extends {
        urls?: string[] | undefined;
        username?: string | undefined;
        credential?: string | undefined;
    } & {
        urls?: (string[] & string[] & Record<Exclude<keyof I["urls"], number | keyof string[]>, never>) | undefined;
        username?: string | undefined;
        credential?: string | undefined;
    } & Record<Exclude<keyof I, keyof ICEServer>, never>>(object: I): ICEServer;
};
export declare const SpeakersChanged: {
    encode(message: SpeakersChanged, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SpeakersChanged;
    fromJSON(object: any): SpeakersChanged;
    toJSON(message: SpeakersChanged): unknown;
    fromPartial<I extends {
        speakers?: {
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        }[] | undefined;
    } & {
        speakers?: ({
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        }[] & ({
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        } & {
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        } & Record<Exclude<keyof I["speakers"][number], keyof SpeakerInfo>, never>)[] & Record<Exclude<keyof I["speakers"], number | keyof {
            sid?: string | undefined;
            level?: number | undefined;
            active?: boolean | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "speakers">, never>>(object: I): SpeakersChanged;
};
export declare const RoomUpdate: {
    encode(message: RoomUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): RoomUpdate;
    fromJSON(object: any): RoomUpdate;
    toJSON(message: RoomUpdate): unknown;
    fromPartial<I extends {
        room?: {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            activeRecording?: boolean | undefined;
        } | undefined;
    } & {
        room?: ({
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            activeRecording?: boolean | undefined;
        } & {
            sid?: string | undefined;
            name?: string | undefined;
            emptyTimeout?: number | undefined;
            maxParticipants?: number | undefined;
            creationTime?: number | undefined;
            turnPassword?: string | undefined;
            enabledCodecs?: ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[] & ({
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            } & Record<Exclude<keyof I["room"]["enabledCodecs"][number], keyof import("./livekit_models").Codec>, never>)[] & Record<Exclude<keyof I["room"]["enabledCodecs"], number | keyof {
                mime?: string | undefined;
                fmtpLine?: string | undefined;
            }[]>, never>) | undefined;
            metadata?: string | undefined;
            numParticipants?: number | undefined;
            activeRecording?: boolean | undefined;
        } & Record<Exclude<keyof I["room"], keyof Room>, never>) | undefined;
    } & Record<Exclude<keyof I, "room">, never>>(object: I): RoomUpdate;
};
export declare const ConnectionQualityInfo: {
    encode(message: ConnectionQualityInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ConnectionQualityInfo;
    fromJSON(object: any): ConnectionQualityInfo;
    toJSON(message: ConnectionQualityInfo): unknown;
    fromPartial<I extends {
        participantSid?: string | undefined;
        quality?: ConnectionQuality | undefined;
        score?: number | undefined;
    } & {
        participantSid?: string | undefined;
        quality?: ConnectionQuality | undefined;
        score?: number | undefined;
    } & Record<Exclude<keyof I, keyof ConnectionQualityInfo>, never>>(object: I): ConnectionQualityInfo;
};
export declare const ConnectionQualityUpdate: {
    encode(message: ConnectionQualityUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): ConnectionQualityUpdate;
    fromJSON(object: any): ConnectionQualityUpdate;
    toJSON(message: ConnectionQualityUpdate): unknown;
    fromPartial<I extends {
        updates?: {
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        }[] | undefined;
    } & {
        updates?: ({
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        }[] & ({
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        } & {
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        } & Record<Exclude<keyof I["updates"][number], keyof ConnectionQualityInfo>, never>)[] & Record<Exclude<keyof I["updates"], number | keyof {
            participantSid?: string | undefined;
            quality?: ConnectionQuality | undefined;
            score?: number | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "updates">, never>>(object: I): ConnectionQualityUpdate;
};
export declare const StreamStateInfo: {
    encode(message: StreamStateInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StreamStateInfo;
    fromJSON(object: any): StreamStateInfo;
    toJSON(message: StreamStateInfo): unknown;
    fromPartial<I extends {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        state?: StreamState | undefined;
    } & {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        state?: StreamState | undefined;
    } & Record<Exclude<keyof I, keyof StreamStateInfo>, never>>(object: I): StreamStateInfo;
};
export declare const StreamStateUpdate: {
    encode(message: StreamStateUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): StreamStateUpdate;
    fromJSON(object: any): StreamStateUpdate;
    toJSON(message: StreamStateUpdate): unknown;
    fromPartial<I extends {
        streamStates?: {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        }[] | undefined;
    } & {
        streamStates?: ({
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        }[] & ({
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        } & {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        } & Record<Exclude<keyof I["streamStates"][number], keyof StreamStateInfo>, never>)[] & Record<Exclude<keyof I["streamStates"], number | keyof {
            participantSid?: string | undefined;
            trackSid?: string | undefined;
            state?: StreamState | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "streamStates">, never>>(object: I): StreamStateUpdate;
};
export declare const SubscribedQuality: {
    encode(message: SubscribedQuality, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SubscribedQuality;
    fromJSON(object: any): SubscribedQuality;
    toJSON(message: SubscribedQuality): unknown;
    fromPartial<I extends {
        quality?: VideoQuality | undefined;
        enabled?: boolean | undefined;
    } & {
        quality?: VideoQuality | undefined;
        enabled?: boolean | undefined;
    } & Record<Exclude<keyof I, keyof SubscribedQuality>, never>>(object: I): SubscribedQuality;
};
export declare const SubscribedCodec: {
    encode(message: SubscribedCodec, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SubscribedCodec;
    fromJSON(object: any): SubscribedCodec;
    toJSON(message: SubscribedCodec): unknown;
    fromPartial<I extends {
        codec?: string | undefined;
        qualities?: {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
    } & {
        codec?: string | undefined;
        qualities?: ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & Record<Exclude<keyof I["qualities"][number], keyof SubscribedQuality>, never>)[] & Record<Exclude<keyof I["qualities"], number | keyof {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, keyof SubscribedCodec>, never>>(object: I): SubscribedCodec;
};
export declare const SubscribedQualityUpdate: {
    encode(message: SubscribedQualityUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SubscribedQualityUpdate;
    fromJSON(object: any): SubscribedQualityUpdate;
    toJSON(message: SubscribedQualityUpdate): unknown;
    fromPartial<I extends {
        trackSid?: string | undefined;
        subscribedQualities?: {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        subscribedCodecs?: {
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        trackSid?: string | undefined;
        subscribedQualities?: ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[] & ({
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        } & Record<Exclude<keyof I["subscribedQualities"][number], keyof SubscribedQuality>, never>)[] & Record<Exclude<keyof I["subscribedQualities"], number | keyof {
            quality?: VideoQuality | undefined;
            enabled?: boolean | undefined;
        }[]>, never>) | undefined;
        subscribedCodecs?: ({
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }[] & ({
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        } & {
            codec?: string | undefined;
            qualities?: ({
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] & ({
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            } & {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            } & Record<Exclude<keyof I["subscribedCodecs"][number]["qualities"][number], keyof SubscribedQuality>, never>)[] & Record<Exclude<keyof I["subscribedCodecs"][number]["qualities"], number | keyof {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["subscribedCodecs"][number], keyof SubscribedCodec>, never>)[] & Record<Exclude<keyof I["subscribedCodecs"], number | keyof {
            codec?: string | undefined;
            qualities?: {
                quality?: VideoQuality | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, keyof SubscribedQualityUpdate>, never>>(object: I): SubscribedQualityUpdate;
};
export declare const TrackPermission: {
    encode(message: TrackPermission, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): TrackPermission;
    fromJSON(object: any): TrackPermission;
    toJSON(message: TrackPermission): unknown;
    fromPartial<I extends {
        participantSid?: string | undefined;
        allTracks?: boolean | undefined;
        trackSids?: string[] | undefined;
        participantIdentity?: string | undefined;
    } & {
        participantSid?: string | undefined;
        allTracks?: boolean | undefined;
        trackSids?: (string[] & string[] & Record<Exclude<keyof I["trackSids"], number | keyof string[]>, never>) | undefined;
        participantIdentity?: string | undefined;
    } & Record<Exclude<keyof I, keyof TrackPermission>, never>>(object: I): TrackPermission;
};
export declare const SubscriptionPermission: {
    encode(message: SubscriptionPermission, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SubscriptionPermission;
    fromJSON(object: any): SubscriptionPermission;
    toJSON(message: SubscriptionPermission): unknown;
    fromPartial<I extends {
        allParticipants?: boolean | undefined;
        trackPermissions?: {
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        }[] | undefined;
    } & {
        allParticipants?: boolean | undefined;
        trackPermissions?: ({
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        }[] & ({
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        } & {
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: (string[] & string[] & Record<Exclude<keyof I["trackPermissions"][number]["trackSids"], number | keyof string[]>, never>) | undefined;
            participantIdentity?: string | undefined;
        } & Record<Exclude<keyof I["trackPermissions"][number], keyof TrackPermission>, never>)[] & Record<Exclude<keyof I["trackPermissions"], number | keyof {
            participantSid?: string | undefined;
            allTracks?: boolean | undefined;
            trackSids?: string[] | undefined;
            participantIdentity?: string | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, keyof SubscriptionPermission>, never>>(object: I): SubscriptionPermission;
};
export declare const SubscriptionPermissionUpdate: {
    encode(message: SubscriptionPermissionUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SubscriptionPermissionUpdate;
    fromJSON(object: any): SubscriptionPermissionUpdate;
    toJSON(message: SubscriptionPermissionUpdate): unknown;
    fromPartial<I extends {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        allowed?: boolean | undefined;
    } & {
        participantSid?: string | undefined;
        trackSid?: string | undefined;
        allowed?: boolean | undefined;
    } & Record<Exclude<keyof I, keyof SubscriptionPermissionUpdate>, never>>(object: I): SubscriptionPermissionUpdate;
};
export declare const SyncState: {
    encode(message: SyncState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SyncState;
    fromJSON(object: any): SyncState;
    toJSON(message: SyncState): unknown;
    fromPartial<I extends {
        answer?: {
            type?: string | undefined;
            sdp?: string | undefined;
        } | undefined;
        subscription?: {
            trackSids?: string[] | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] | undefined;
        } | undefined;
        publishTracks?: {
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            } | undefined;
        }[] | undefined;
        dataChannels?: {
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        }[] | undefined;
    } & {
        answer?: ({
            type?: string | undefined;
            sdp?: string | undefined;
        } & {
            type?: string | undefined;
            sdp?: string | undefined;
        } & Record<Exclude<keyof I["answer"], keyof SessionDescription>, never>) | undefined;
        subscription?: ({
            trackSids?: string[] | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] | undefined;
        } & {
            trackSids?: (string[] & string[] & Record<Exclude<keyof I["subscription"]["trackSids"], number | keyof string[]>, never>) | undefined;
            subscribe?: boolean | undefined;
            participantTracks?: ({
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[] & ({
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            } & {
                participantSid?: string | undefined;
                trackSids?: (string[] & string[] & Record<Exclude<keyof I["subscription"]["participantTracks"][number]["trackSids"], number | keyof string[]>, never>) | undefined;
            } & Record<Exclude<keyof I["subscription"]["participantTracks"][number], keyof ParticipantTracks>, never>)[] & Record<Exclude<keyof I["subscription"]["participantTracks"], number | keyof {
                participantSid?: string | undefined;
                trackSids?: string[] | undefined;
            }[]>, never>) | undefined;
        } & Record<Exclude<keyof I["subscription"], keyof UpdateSubscription>, never>) | undefined;
        publishTracks?: ({
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            } | undefined;
        }[] & ({
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            } | undefined;
        } & {
            cid?: string | undefined;
            track?: ({
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            } & {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] & ({
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                } & Record<Exclude<keyof I["publishTracks"][number]["track"]["layers"][number], keyof VideoLayer>, never>)[] & Record<Exclude<keyof I["publishTracks"][number]["track"]["layers"], number | keyof {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[]>, never>) | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] & ({
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                } & {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                } & Record<Exclude<keyof I["publishTracks"][number]["track"]["codecs"][number], keyof import("./livekit_models").SimulcastCodecInfo>, never>)[] & Record<Exclude<keyof I["publishTracks"][number]["track"]["codecs"], number | keyof {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[]>, never>) | undefined;
            } & Record<Exclude<keyof I["publishTracks"][number]["track"], keyof TrackInfo>, never>) | undefined;
        } & Record<Exclude<keyof I["publishTracks"][number], keyof TrackPublishedResponse>, never>)[] & Record<Exclude<keyof I["publishTracks"], number | keyof {
            cid?: string | undefined;
            track?: {
                sid?: string | undefined;
                type?: TrackType | undefined;
                name?: string | undefined;
                muted?: boolean | undefined;
                width?: number | undefined;
                height?: number | undefined;
                simulcast?: boolean | undefined;
                disableDtx?: boolean | undefined;
                source?: TrackSource | undefined;
                layers?: {
                    quality?: VideoQuality | undefined;
                    width?: number | undefined;
                    height?: number | undefined;
                    bitrate?: number | undefined;
                    ssrc?: number | undefined;
                }[] | undefined;
                mimeType?: string | undefined;
                mid?: string | undefined;
                codecs?: {
                    mimeType?: string | undefined;
                    mid?: string | undefined;
                    cid?: string | undefined;
                }[] | undefined;
            } | undefined;
        }[]>, never>) | undefined;
        dataChannels?: ({
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        }[] & ({
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        } & {
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        } & Record<Exclude<keyof I["dataChannels"][number], keyof DataChannelInfo>, never>)[] & Record<Exclude<keyof I["dataChannels"], number | keyof {
            label?: string | undefined;
            id?: number | undefined;
            target?: SignalTarget | undefined;
        }[]>, never>) | undefined;
    } & Record<Exclude<keyof I, keyof SyncState>, never>>(object: I): SyncState;
};
export declare const DataChannelInfo: {
    encode(message: DataChannelInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): DataChannelInfo;
    fromJSON(object: any): DataChannelInfo;
    toJSON(message: DataChannelInfo): unknown;
    fromPartial<I extends {
        label?: string | undefined;
        id?: number | undefined;
        target?: SignalTarget | undefined;
    } & {
        label?: string | undefined;
        id?: number | undefined;
        target?: SignalTarget | undefined;
    } & Record<Exclude<keyof I, keyof DataChannelInfo>, never>>(object: I): DataChannelInfo;
};
export declare const SimulateScenario: {
    encode(message: SimulateScenario, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number | undefined): SimulateScenario;
    fromJSON(object: any): SimulateScenario;
    toJSON(message: SimulateScenario): unknown;
    fromPartial<I extends {
        speakerUpdate?: number | undefined;
        nodeFailure?: boolean | undefined;
        migration?: boolean | undefined;
        serverLeave?: boolean | undefined;
        switchCandidateProtocol?: CandidateProtocol | undefined;
    } & {
        speakerUpdate?: number | undefined;
        nodeFailure?: boolean | undefined;
        migration?: boolean | undefined;
        serverLeave?: boolean | undefined;
        switchCandidateProtocol?: CandidateProtocol | undefined;
    } & Record<Exclude<keyof I, keyof SimulateScenario>, never>>(object: I): SimulateScenario;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;
export {};
//# sourceMappingURL=livekit_rtc.d.ts.map