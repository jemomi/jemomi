import type { PublicStatus, SignaturPayload, Status } from '#shared/types/signaturGruppen';

const sanitizePayload = (payload: SignaturPayload): PublicStatus['payload'] => {
    const { unsubscribe: _unsubscribe, ...meta } = payload.meta ?? {};

    return {
        ...payload,
        meta,
    };
}

export const toPublicStatus = (status: Status): PublicStatus => {
    const { headers: _headers, ...publicStatus } = status;

    return {
        ...publicStatus,
        payload: sanitizePayload(status.payload),
    };
}
