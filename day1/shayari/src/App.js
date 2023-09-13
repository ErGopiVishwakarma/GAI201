import logo from './logo.svg';
import './App.css';
import { Box, Button, Flex, Heading, Input, Select, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios'

function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [topic, setTopic] = useState()
  const [wantTo, setWantTo] = useState()

  const generate = async () => {

    if (!topic || !wantTo) {
      return
    }
    try {
      const config = {
        topic, wantTo
      }
      console.log('reach')
      setLoading(true)
      let data = await axios.post('https://quote-generator-3u8b.onrender.com/', config)
      data = data.data.trim().split("\n")
      setData(data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      alert(error)
    }
  }

  return (
    <Box bg='cyan.100' h={'100vh'} w='100%' pt='20px'>
      <Flex bg='white' w={{ base: "100%", sm: '500px' }} direction={'column'} gap={'15px'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} p={'20px'} m={'auto'} >
        <Heading fontSize={'25px'} textAlign={'center'} pb='10px'>Quote Generatore</Heading>
        <Input placeholder='write topic like, life student love career etc.' onChange={(e) => setTopic(e.target.value)} />
        <Select onChange={(e) => setWantTo(e.target.value)}>
          <option value={""}>select what you want</option>
          <option value={"shayari"}>shayari</option>
          <option value={"story"}>story</option>
          <option value={"joke"}>joke</option>
          <option value={"motivation"}>motivation</option>
        </Select>
        <Button m='auto' bg={'black'} colorScheme='white' onClick={generate}>Generate</Button>
        <Flex direction={'column'} w='100%' overflow={'auto'} minH={'80px'} py='15px' maxH={'250px'}  >
          {
            data ? loading ? <Flex w='100%' alignItems={'center'} justifyContent={'center'}><Spinner /></Flex>: data?.map((el, ind) => {
              return el ? <pre>{el}</pre> : <br />
            }) : ""
          }
        </Flex>
      </Flex>
    </Box>
  );
}

export default App;
