
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import usePriceAnalytics from "hooks/data/usePriceAnalytics"


export default function PriceTable({ id}: { id: string }) {
  const { data: prices1} = usePriceAnalytics(id, '1')
  const { data: prices3 } = usePriceAnalytics(id, '3')
  const { data: pricesAll, isLoading, isError } = usePriceAnalytics(id, '36')
  
  if ((!prices1 )|| (!prices3) || (!pricesAll)) {
    return <div>loading</div>
  }

  if (isLoading) {
    return <div>loading</div>
  }  
  
  return (
    <div className='mt-6 w-full'>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th></Th>
              <Th><span className='text-gray-400'>Last 1 month</span></Th>
              <Th><span className='text-gray-400'>Last 3 months</span></Th>
              <Th><span className='text-gray-400'>All-time</span></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td borderBottomColor='gray.700'>Low</Td>
              <Td borderBottomColor='gray.700' textAlign="center">
                {prices1.rows && prices1?.rows[0].min !== null ? '$' + prices1?.rows[0].min.toFixed(2) : '-'}
              </Td>
              <Td borderBottomColor='gray.700' textAlign="center">
                {prices3.rows && prices3.rows[0].min !== null   ? '$' + prices3?.rows[0].min.toFixed(2) : '-'}
              </Td>
              <Td borderBottomColor='gray.700' textAlign="center">
                {pricesAll.rows && pricesAll.rows[0].min !== null   ? '$' + pricesAll?.rows[0].min.toFixed(2) : '-'}
              </Td>
            </Tr>
            <Tr>
              <Td borderBottomColor='gray.700' >High</Td>
              <Td borderBottomColor='gray.700' textAlign="center">
                {prices1.rows && prices1.rows[0].max !== null   ? '$' + prices1?.rows[0].max.toFixed(2) : '-'}
              </Td>
              <Td borderBottomColor='gray.700' textAlign="center">
                {prices3.rows && prices3.rows[0].max !== null   ? '$' + prices3?.rows[0].max.toFixed(2) : '-'}
              </Td>
              <Td borderBottomColor='gray.700' textAlign="center">
                {pricesAll.rows && pricesAll.rows[0].max !== null  ? '$' + pricesAll?.rows[0].max.toFixed(2) : '-'}
              </Td>
            </Tr>
            <Tr>
              <Td borderBottomColor='gray.700'>Average</Td>
              <Td borderBottomColor='gray.700' textAlign="center">
                {prices1.rows && prices1.rows[0].avg !== null   ? '$' + prices1?.rows[0].avg.toFixed(2) : '-'}
              </Td>
              <Td borderBottomColor='gray.700' textAlign="center">
                {prices3.rows && prices3.rows[0].avg !== null   ? '$' + prices3?.rows[0].avg.toFixed(2) : '-'}
              </Td>
              <Td borderBottomColor='gray.700' textAlign="center">
                {pricesAll.rows && pricesAll.rows[0].avg !== null   ? '$' + pricesAll?.rows[0].avg.toFixed(2) : '-'}
              </Td>
            </Tr>
            <Tr>
              <Td borderBottomColor='gray.700' >Estimate</Td>
              <Td borderBottomColor='gray.700' textAlign="center">
                {prices1.rows && prices1.rows[0].avg !== null    ? '$' + prices1?.rows[0].avg.toFixed(2) : '-'}
              </Td>
              <Td borderBottomColor='gray.700' textAlign="center">
                {prices3.rows && prices3.rows[0].avg !== null    ? '$' + prices3?.rows[0].avg.toFixed(2) : '-'}
              </Td>
              <Td borderBottomColor='gray.700' textAlign="center">
                {pricesAll.rows && pricesAll.rows[0].avg !== null   ? '$' + pricesAll?.rows[0].avg.toFixed(2) : '-'}
              </Td>
            </Tr>
          </Tbody>
        </Table>
    </TableContainer>

      </div>
  )
}