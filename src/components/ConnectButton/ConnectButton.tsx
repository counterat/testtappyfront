import React, { useEffect, useState } from 'react';

import { TonConnectButton } from '@tonconnect/ui-react';
import { Wallet } from '@tonconnect/ui';
import { ton } from 'constants/tonObject';
// Инициализация провайдера


const ConnectButton = () => {

    const [isConnected, setIsConnected] = useState(false);
    const [connectedWallet, setConnectedWallet] = useState<Wallet | null>(null);
    console.log(ton.connected, ton.wallet)
    useEffect(() => {
        // Подписка на изменение статуса подключения
        const unsubscribe = ton.onStatusChange((wallet) => {
            setConnectedWallet(wallet)
            console.log(wallet)
            setIsConnected(wallet !== null);
        });

        // Очистка подписки при размонтировании компонента
        return () => {
            unsubscribe();
        };
    }, [isConnected]);

    const handleOpenModal = () => {
        // Открытие модального окна для подключения
        ton.openModal();
    };
    const handleDisconnect = () => {
        ton.disconnect();
      };

    return (
        <div>
            {ton.connected ? (
          <div>
            <p>Connected Wallet: {ton.wallet?.account?.address}</p>
            <button className="change-wallet-button" onClick={handleDisconnect}>Change Wallet</button>
          </div>
        ) : (
            <button onClick={handleOpenModal}>
            Connect TON Wallet
        </button>
        )}



         
        </div>
    );
};

export default ConnectButton;
