"use client";
import React, { use, useState } from 'react'
import EachFilter from '~~/components/custom/EachFilter'
import EqubCard from '~~/components/custom/EqubCard'
import Header from '~~/components/custom/Header'
import JoinTopHeader from '~~/components/custom/JoinTopHeader'
import SearchIcon from '~~/components/custom/SearchIcon'
import EqubDetail from '~~/app/equbdetail/page'

interface EqubDetailEachProps {
  equbDetails: string[];
}

const JoinWrap: React.FC<EqubDetailEachProps> = ({ equbDetails })  => {

  const [filters, setFilters] = useState({
    equbTitle: '',
    poolAmount: '',
    numberOfParticipants: '',
    contributionPerRound: '',
    poolDuration: '',
    minCreditScore: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name as keyof typeof filters]: value,
    }));
  };


  return (
    <>
      <div  className="custom-sticky"> 
        <JoinTopHeader />
        <Header />
      </div>
      <div className='custom-join'>
        <div className='custom-join-side'>
          <div className='custom-join-side-title'>
            Filters
          </div>
          <form className="custom-join-side-filters">
            <EachFilter name="equbTitle" value={filters.equbTitle} onChange={handleChange} />
            <EachFilter name="poolAmount" value={filters.poolAmount} onChange={handleChange} />
            <EachFilter name="numberOfParticipants" value={filters.numberOfParticipants} onChange={handleChange} />
            <EachFilter name="contributionPerRound" value={filters.contributionPerRound} onChange={handleChange} />
            <EachFilter name="poolDuration" value={filters.poolDuration} onChange={handleChange} />
            <EachFilter name="minCRCScore" value={filters.minCreditScore} onChange={handleChange} />
          </form>
        </div>
        <div className='custom-join-main'>
          <div className='custom-join-main-header'>
            All Pools
          </div>
          <div className='custom-join-main-body'>
            <EqubDetail equbDetails={equbDetails} filters={filters} />
          </div>
        </div>
      </div>
    </>
  )
}

export default JoinWrap;