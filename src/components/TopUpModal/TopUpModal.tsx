import React, { useState } from 'react';
import './TopUpModal.css';
 import ConnectButton from 'components/ConnectButton/ConnectButton';
 import { ton } from 'constants/tonObject';
import { FetchUser } from 'api/user';
import { useAppSelector, useAppDispatch } from 'store';
import { setTappyCoin } from 'store/reducers/userReducer';
interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose }) => {
  const [tonAmount, setTonAmount] = useState<string>('1');
  const dispatch = useAppDispatch();
  const [amountToSend, setAmountToSend ] = useState(0);
  const [error, setError] = useState<string>('');
  const tappyAmount = Number(tonAmount) * 100;
  const { user } = useAppSelector((state) => state.user);
    console.log(user)
  const handleTonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (Number(value) > 0 || value === '') {
      setTonAmount(value);
      setError('');
    } else {
      setError('Amount must be greater than 0');
    }
  };
  const sendSuccessfulTransaction = async (amount:number) =>{
    try {
        
        const result = await FetchUser.sendSuccessfulTransaction(user.id, amount);
        console.log('Transaction successful:', result);
        return result
    } catch (error) {
        console.error('Error during transaction:', error);
        return null
    }
}



  const handleBuy = async () => {
    if (Number(tonAmount) > 0) {
        console.log(String(Number(tonAmount) * 1e9))
        console.log(tonAmount)
        setAmountToSend(Number(tonAmount))
        console.log(amountToSend)
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60,
        messages: [
            {
                address: "UQD5h2QYHlhUBOXRrFIAj1t5LOPTL8c5pQHJlgaYXgECv4l3",
                amount: String(Number(tonAmount) * 1e9),
     
             // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
            },]
       
      };

      try {
        
        await ton.sendTransaction(transaction).then(resp=>{
          console.log(resp)
          sendSuccessfulTransaction(Number(tonAmount)).then(json=>{
            if (json!=null){
              dispatch(setTappyCoin( parseInt(json.balance_in_tappycoin)))
            }
          })
        });
        
        onClose();
      } catch (error) {

        console.error('Transaction error:', error);
      }
    } else {
      setAmountToSend(0)
      setError('Amount must be greater than 0');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>TOP UP A TAPPY</h2>
        <p>Добавьте кошелек для пополнения. Вы сможете изменить его позже.</p>
         <ConnectButton/> 
        <div className="input-group">
          <label htmlFor="tonAmount">TON Amount:</label>
          <input
            type="number"
            id="tonAmount"
            value={tonAmount}
            onChange={handleTonChange}
            min="1"
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        {tonAmount && <p>{tonAmount} TON = {tappyAmount} TAPPY</p>}
        <button className="buy-button" onClick={handleBuy}>Buy</button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TopUpModal;
