import React, { ReactElement } from 'react';
import {
  Container,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  CircularProgress,
} from '@material-ui/core';
import { useGetCharactersQuery } from '../../generated/graphql';

interface Props {}

export default function CharacterTable(props: Props): ReactElement {
  const { data, loading, error } = useGetCharactersQuery();

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Species</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Container>
  );
}
