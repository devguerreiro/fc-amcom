// framework
import { memo } from "react";

// lib components
import {
    Autocomplete,
    Box,
    Button,
    SxProps,
    TextField,
    Typography,
} from "@mui/material";

// app services
import Seller from "@/domain/entities/seller";
import Client from "@/domain/entities/client";

import useSaleData from "./SaleEditSaleData.view";

import { convertToBRDate, convertToBRL } from "@/utils";
import { Sale } from "@/domain/entities/sale";

interface IProps {
    sx?: SxProps;
    totalPrice: number;
    sellers: Array<Seller>;
    clients: Array<Client>;
    sale: Sale;
    onCancel: () => void;
}

export default memo(function SaleEditSaleData(props: IProps) {
    const { sx, totalPrice, sellers, clients, sale, onCancel } = props;

    const {
        form,
        setSeller,
        setClient,
        getSellerLabel,
        getClientLabel,
        isClientOptionEqualToValue,
        isSellerOptionEqualToValue,
    } = useSaleData();

    const {
        formState: { errors },
    } = form;

    return (
        <Box sx={sx} display="flex" flexDirection="column">
            <Typography
                variant="h5"
                component="h2"
                color="primary"
                fontWeight="bold"
            >
                Dados da Venda
            </Typography>
            <Typography variant="caption" component="h3">
                {sale.nfe} - NFe
            </Typography>
            <Box display="flex" flexDirection="column" flexGrow={1}>
                <TextField
                    label="Data e Hora da Venda"
                    inputProps={{
                        readOnly: true,
                    }}
                    defaultValue={convertToBRDate(new Date(sale.createdAt))}
                    margin="normal"
                />
                <Autocomplete
                    {...form.register("seller")}
                    onChange={setSeller}
                    autoHighlight
                    autoComplete
                    clearOnEscape
                    filterSelectedOptions
                    options={sellers}
                    getOptionLabel={getSellerLabel}
                    isOptionEqualToValue={isSellerOptionEqualToValue}
                    noOptionsText="Nenhum vendedor encontrado"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!errors.seller}
                            helperText={errors.seller?.message}
                            label="Escolha um vendedor"
                            placeholder="Selecione o nome"
                            required
                            margin="normal"
                        />
                    )}
                    defaultValue={sale.seller}
                />
                <Autocomplete
                    {...form.register("client")}
                    onChange={setClient}
                    autoHighlight
                    autoComplete
                    clearOnEscape
                    filterSelectedOptions
                    options={clients}
                    getOptionLabel={getClientLabel}
                    isOptionEqualToValue={isClientOptionEqualToValue}
                    noOptionsText="Nenhum cliente encontrado"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={!!errors.client}
                            helperText={errors.client?.message}
                            label="Escolha um cliente"
                            placeholder="Selecione o nome"
                            required
                            margin="normal"
                        />
                    )}
                    defaultValue={sale.client}
                />
            </Box>
            <Box
                mt={4}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="end"
                gap={1}
            >
                <Typography
                    variant="subtitle1"
                    component="strong"
                    fontWeight="bold"
                    color="warning.dark"
                >
                    Valor total da venda:
                </Typography>
                <Typography
                    variant="h5"
                    component="strong"
                    fontWeight="bold"
                    color="success.light"
                    sx={{
                        wordBreak: "break-word",
                    }}
                >
                    {convertToBRL(totalPrice)}
                </Typography>
            </Box>
            <Box mt={6} display="flex" justifyContent="space-between">
                <Button color="warning" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button variant="contained" type="submit" size="large">
                    Salvar
                </Button>
            </Box>
        </Box>
    );
});
