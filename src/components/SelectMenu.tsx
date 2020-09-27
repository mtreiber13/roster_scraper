import * as React from 'react';
import {Select, MenuItem} from '@material-ui/core';
import useAxios from 'axios-hooks';

export interface selectState {
   division: string;
}

export interface selectProps {
   division: string;
}

function SelectMenu (props:selectProps) {
   const [state] = React.useState<selectState>({ 
            division: props.division
      })

   const [{ data, loading, error}] = useAxios({
      url: 'http://localhost:2999/get_' + state.division + '_links',
      method: 'GET',
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      }
   })

   interface schoolLink {
      name:string;
      link:string;
   }
   function createMenu(){
         try {
            return (
               <Select labelId="label" id="select" value={state.division}>
                  {data.teams.map( (x:schoolLink) => {
                     return <MenuItem value={x.link}> {x.name} </MenuItem>
                  })}
               </Select>
            );
         } catch (err) {
            return (
               <p> {JSON.stringify(error)} </p>
            );
         }
   }

   if (loading) {
      return (
         <div>
            <p> LOADING {state.division} </p>
         </div>
      )
   }
   if (error) {
      return (
         <div>
            <p> ERROR: {error.toString()} </p>
         </div>
      )
   }
   return (
      <div>
         {createMenu()}
      </div>
         
   )
}


export default SelectMenu;
