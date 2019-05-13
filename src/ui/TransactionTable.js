import React from 'react'

export const TransactionTable = ({ transactions }) => (
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Type</th>
        <th>Amount</th>
        <th>Balance</th>
        <th>Info</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(({ time, type, amount, currency, balance, details, ...info }) => (
        <tr>
          <td>{time && time.format('YYYY-MMM-DD HH:mm')}</td>
          <td>{type}</td>
          <td>{amount} {currency}</td>
          <td>{balance}</td>
          <td>{Object.entries(info).map(([k, v]) => <>{k}={'' + v}<br /></>)}</td>
          <td>{details.map(d => <>{'' + d}<br /></>)}</td>
        </tr>
      ))}
    </tbody>
  </table>
)
