import React, { useRef} from "react";
import {Button} from "antd";
import {dispatch} from "@/utils/dispatch";


const TestShell: React.FC = () => {



  const containerRef = useRef<HTMLDivElement>(null)


  return (
    <div style={{width: '100%'}}>
      <Button onClick={async () => {
        await dispatch('/script/start-script-server')
      }} type={'primary'}>Start Test</Button>
      <div ref={containerRef} style={{
        width: '500px',
        height: '500px',
        overflow: 'auto',
        padding: 10,
        backgroundColor: '#949494',
      }}>

      </div>
    </div>
  )
}

export default TestShell
