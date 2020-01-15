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
  Typography,
  Box,
  TableBody,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { useGetCharactersQuery } from '../../generated/graphql';
import CharacterData from '../character-data/character-data';

interface Props {}

// Create hook to add additional styles (see: https://material-ui.com/customization/components/#overriding-styles-with-classes)
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  })
);

export default function CharacterTable(props: Props): ReactElement {
  const classes = useStyles();

  // Use hook to retrieve data from the backend
  const { data, loading, error } = useGetCharactersQuery();

  if (loading) {
    return (
      <Container className={classes.root}>
        <Box display='flex' justifyContent='center' alignContent='center'>
          <CircularProgress />
        </Box>
      </Container>
    );
  } else if (error) {
    return (
      <Container className={classes.root}>
        <Box display='flex' justifyContent='center' alignContent='center'>
          <Typography variant='h5'>Error retrieving data, please try again.</Typography>
        </Box>
      </Container>
    );
  } else if (!data || !data.characters || !data.characters.results) {
    return (
      <Container className={classes.root}>
        <Box display='flex' justifyContent='center' alignContent='center'>
          <Typography variant='h5'>No data available, please try again.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container className={classes.root}>
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
          <TableBody>
            {data.characters.results.map(character => (
              <CharacterData character={character} key={character?.id!} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
