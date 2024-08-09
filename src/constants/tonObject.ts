import { TonConnectUI } from '@tonconnect/ui';

export const ton = new TonConnectUI({
    manifestUrl: 'https://api.tappybrd.com/tonconnect-manifest.json',
    actionsConfiguration:{
        modals : ['before', 'success', 'error'],
        notifications: ['before', 'success', 'error']
    }
});
