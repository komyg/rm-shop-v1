import React, { ReactElement } from 'react';
import { Character, Maybe } from '../../generated/graphql';
import { TableRow, TableCell } from '@material-ui/core';

interface Props {
  character: Maybe<Character | null>;
}

export default function CharacterData(props: Props): ReactElement {
  return (
    <TableRow>
      <TableCell>{props.character?.name}</TableCell>
      <TableCell>{props.character?.species}</TableCell>
      <TableCell>{props.character?.origin?.name}</TableCell>
      <TableCell>{props.character?.location?.name}</TableCell>
    </TableRow>
  );
}
