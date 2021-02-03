import React from 'react'
import { connect } from 'react-redux'

const Tasks = ({syncTasks}) => {
	if (!syncTasks.length) {
		return <p>No data</p>
	}
	return syncTasks.map(task => <p>Task</p>)
}

const mapStateToProps = state => {
	return {
		syncTasks: state.tasks
	}
}

export default connect(mapStateToProps, null)(Tasks)
