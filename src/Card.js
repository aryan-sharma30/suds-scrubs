import React from 'react';
import './Card.css';
import { ReactComponent as MyIcon } from './images/calendar-svgrepo-com.svg';

function Card({ orderID, packageType, carCompanyAndName, address, onDelete, onModify }) {
  return (
    <div className="card">
      <div className="card__icon">
        <MyIcon className="calendar-icon" alt="Calendar Icon" />
      </div>
      <div className="card__content">
        <h2 className="card__title" >Order ID : {orderID}</h2>
        <p className="card__description" style={{ color: 'black' }}>Service: {packageType}</p>
        <p className="card__description" style={{ color: 'black' }}>Car: {carCompanyAndName}</p>
        <p className="card__address" style={{ color: 'black' }}>{address}</p>
      </div>
      <div className="card__actions">
        <button className="modify-btn" onClick={() => onModify(orderID)}>Modify</button>
        <button className="delete-btn" onClick={() => {
          if (window.confirm('Are you sure you want to delete this wash?')) {
              onDelete(orderID);
          }
      }}>Delete</button>
      </div>
    </div>
  );
}

export default Card;
