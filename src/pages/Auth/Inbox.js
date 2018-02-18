import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Toggle from 'material-ui/Toggle';
const styles = {
  toggle: {
    marginBottom: 16,
  },
};


export default () => {
  return (
    <div className="inbox">
      <div className="inbox-header">
        <strong>Pending</strong>
      </div>
      <div className="inbox-table">
        <Table>
          <TableHeader displaySelectAll={false}
            adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Approve?</TableHeaderColumn>
              <TableHeaderColumn>Requested From</TableHeaderColumn>
              <TableHeaderColumn>Proposed Context</TableHeaderColumn>
              <TableHeaderColumn>Time Requested</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn> <Toggle
                style={styles.toggle} />
              </TableRowColumn>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn> <Toggle
                style={styles.toggle} />
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>Randal White</TableRowColumn>
                <TableRowColumn>Unemployed</TableRowColumn>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn><Toggle
                style={styles.toggle} />
                <TableRowColumn>3</TableRowColumn>
                <TableRowColumn>Stephanie Sanders</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn><Toggle
                style={styles.toggle} />
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Steve Brown</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn> <Toggle
                style={styles.toggle} />
                <TableRowColumn>5</TableRowColumn>
                <TableRowColumn>Christopher Nolan</TableRowColumn>
                <TableRowColumn>Unemployed</TableRowColumn>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

