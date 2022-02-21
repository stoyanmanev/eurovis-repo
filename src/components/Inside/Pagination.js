import React from 'react'

export default function Pagination({resultPerPage, totalResult, paginate}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalResult / resultPerPage); i++){
        pageNumbers.push(i)
    }

  return (
    <div className='pagination-area'>
        <ul className='pagination'>
            {pageNumbers.map(number => (
                <li key={number} className="page-item">
                    <a onClick={(e) => paginate(e,number)} href="!#" className='page-link'>
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    </div>
  )
}
