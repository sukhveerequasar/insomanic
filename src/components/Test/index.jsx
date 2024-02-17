import React from 'react' 
import { Img } from '../Img';
import { List } from '../List';
import { Text } from '../Text';
import { Line } from '../Line';
import { Button } from '../Button';



function Test() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
    <div className="container mx-auto flex flex-col md:flex-row">
      {/* Main Content - 8 columns with a gray background */}
      <div className="md:w-2/3 p-8 bg-gray-800">
        {/* Your main content here */}
      </div>
  
      {/* Sidebar - 4 columns with a darker gray background */}
      <div className="md:w-1/3 bg-gray-900 p-8">
        {/* Your sidebar content here */}
      </div>
    </div>
  </div>
  

  )
}

export default Test