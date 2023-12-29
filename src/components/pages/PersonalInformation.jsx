/* eslint-disable react/prop-types */
import InputGroups from '../InputGroups';
// import { useState } from 'react';

const PersonalInformation =({data, handleForm})=>{
    const {fullName, contact, location} = data;
    return(
        <div className='grid grid-cols-1 gap-6 py-8 px-4 border border-x-slate-400'>
            <div className='grid grid-cols-2 gap-3 '>
                <InputGroups 
                    labelName = "Full Name"
                    htmlFor = "fullName"
                    data={fullName}
                    id= "fullName"
                    name = "fullName"
                    type="text"
                    handle={handleForm.handle}
                    placeholder ="John Smith"/>
                <InputGroups
                    labelName = "Phone"
                    htmlFor = "phone"
                    data = {contact.phone}
                    id="telephoneNumber"
                    name = "phone"
                    type= "tel"
                    handle={handleForm.handleContact}
                    placeholder= "208-221-2345"/>
      
                </div>
            <div className='grid grid-cols-2 gap-3'>
      
                <InputGroups
                    labelName = "Email Address"
                    htmlFor = "email"
                    data = {contact.email}
                    id="email"
                    name = "email"
                    type= "email"
                    handle={handleForm.handleContact}
                    placeholder= "www.jsmith0123@mycv.com"/>

                <InputGroups
                    labelName = "LinkedIn Profile"
                    htmlFor = "linkedinProfile"
                    data = {contact.linkedinProfile}
                    id="linkedinProfile"
                    name = "linkedinProfile"
                    type= "url"
                    handle={handleForm.handleContact}
                    placeholder = "https://www.linkedin.com/johnsmith"/>
     
            </div>
            <div className='grid grid-cols-2 gap-3'>
                <InputGroups
                    labelName = "City"
                    htmlFor = "city"
                    data = {location.city}
                    id="city"
                    name = "city"
                    type= "text"
                    handle={handleForm.handleLocation}
                    placeholder = "Boston"/> 
                <InputGroups
                    labelName = "Country"
                    htmlFor = "country"
                    data = {location.country}
                    id="country"
                    name = "country"
                    type= "text"
                    handle={handleForm.handleLocation}
                    placeholder = "USA"/> 
            </div>
           
        </div>
    )
}

export default PersonalInformation;