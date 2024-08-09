import React, { useState } from 'react';
import WalletModal from 'components/WalletConnect/WalletConnect';
import { TonConnectUI } from '@tonconnect/ui';
import './styles.css';
/* import ConnectButton from 'components/ConnectButton/ConnectButton'; */
import TopUpModal from 'components/TopUpModal/TopUpModal';
interface DialogProps {
  tonConnect: TonConnectUI | null;
}

const Dialog = () => {
 const [modalOpen, setModalOpen] = useState(false)
  return (
    <div>
    <h1>TON Wallet Connection</h1>
{/*     <ConnectButton /> */}
    <button onClick={()=>{setModalOpen(true)}}>Открыть</button>
     <TopUpModal isOpen={modalOpen} onClose={()=>{setModalOpen(false)}} /> 
</div>
  );
};

export default Dialog;
