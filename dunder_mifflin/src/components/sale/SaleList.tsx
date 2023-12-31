import { memo } from "react";

// lib components
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

// app services
import { Sale } from "@/domain/entities/sale";

// app components
import SaleListSale from "./SaleListSale";

interface IProps {
    sales: Array<Sale>;
}

export default memo(function SaleList(props: IProps) {
    const { sales } = props;

    const renderTableBody = () => {
        return sales.map((sale: Sale) => (
            <SaleListSale key={sale.nfe} sale={sale} />
        ));
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                maxHeight: 475,
            }}
        >
            <Table aria-label="Tabela das vendas realizadas">
                <TableHead>
                    <TableRow>{renderTableHeader()}</TableRow>
                </TableHead>
                <TableBody>{renderTableBody()}</TableBody>
            </Table>
        </TableContainer>
    );
});

const tableHeaders = [
    "Nota Fiscal",
    "Cliente",
    "Vendedor",
    "Data da Venda",
    "Valor Total",
    "Opções",
];

const renderTableHeader = () => {
    return tableHeaders.map((header: string) => (
        <TableCell key={header}>{header}</TableCell>
    ));
};
