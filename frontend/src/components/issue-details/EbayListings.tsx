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
    Link,
    LinkOverlay,
    LinkBox,
  } from '@chakra-ui/react'
import useSWR, { useSWRConfig } from "swr";

export default function EbayListings({ id }: { id: string }) {
    const dateRegex = /(\d{4})-(\d{2})-(\d{2})T.*/;
    const { data, error } = useSWR<any>(`/issue/${id}/prices/listing`);

    if (!data) {
        return 'loading';
    }
    if (error) {
        return error.message;
    }
    const prices = (cleanPrices(data.rows));
    return (
        <div className='mt-6'>
            <TableContainer>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>{"Date"}</Th>
                            <Th>{"Price"}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {prices.map((price: any) => (
                            <Tr>
                                <Td key={price.date}>
                                    <Link href={price.ebayurl}>{price.date.replace(dateRegex, '$2-$3-$1')}</Link> 
                                </Td>
                                <Td key={price.price}>
                                    <Link href={price.ebayurl}>{'$' + price.price.toFixed(2)}</Link>
                                </Td>
                            </Tr>
                    ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

function cleanPrices(data: any) {
    const SortedPrices = data.sort((a: any, b: any) => b['price'] - a['price']).slice(0, 5);
    const sortedDates = SortedPrices.sort((a: any, b: any) => new Date(a['date']).getTime() - new Date(b['date']).getTime());
    return sortedDates;
}

