import {
    CreateButton,
    Datagrid,
    FilterButton, FilterForm,
    ListBase,
    Pagination,
    SearchInput,
    TextField
} from "react-admin";
import { Stack } from '@mui/material';

const postFilters = [

    <SearchInput source="q" alwaysOn  name="search" key="" />

];

const PatientListToolbar = () => (
    <Stack direction="row" justifyContent="space-between">
        <FilterForm filters={postFilters} />
        <div>
            <FilterButton filters={postFilters} />
            <CreateButton />
        </div>
    </Stack>
)

const PatientList = () => (
    <ListBase>
        <PatientListToolbar />
        <Datagrid>
            <TextField source="id" />
            <TextField source="full_name" />
            <TextField source="amka" />
        </Datagrid>
        <Pagination />
    </ListBase>
)

export default PatientList()