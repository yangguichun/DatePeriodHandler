import moment from 'moment'
/***
* @tempPeriodType, String, enum: day, week, month, year, total
* @host, Object, which should contain a function named action, has no param
* usage:
* import TimePeriodHandler from 'TimePeriodHandler.js'
* var periodHandler = new TimePeriodHandler('day', this)
* periodHandler.next();
* queryData(periodHandler.getBeginTime(), periodHandler.getEndTime())
**/
export default function (tempPeriodType, host) {
	// all fields
	var dateValue = moment().format('YYYY-MM-DD')
	var periodType = tempPeriodType
	var beginTime, endTime

	// init the object
	changeDate(new Date())

	// define the public functions
  this.getDateValue = function () {
    if (periodType == 'day' || periodType == 'week' ) {      	
      return moment(dateValue).format('YYYY-MM-DD')
    }else if(periodType == 'month'){
      return moment(dateValue).format('YYYY-MM')
    }else if(periodType == 'year'){
    	return moment(dateValue).format('YYYY')
    }else{
      return moment(dateValue).format('YYYY-MM-DD')
    }    
  }


  /**
  * change the period type to a new period type, then reset the begin time and end time
  * then call the host.action() to do something
  * @newPeriodType, String enum: 'day', 'week', 'month', 'year', 'total'
  */
	this.changePeriodType = function(newPeriodType){
		console.log('changeDatePeriod, ' + newPeriodType)
		periodType = newPeriodType
		changeDate(moment().format('YYYY-MM-DD'))	
		if(host)
      host.action() 	
	}	

  /**
  * change the begin and end date to the specified period, it's depends the period type
  * after change the date period, it will call the host.action() to do something
  */
  this.changeToDate = function (newDate) {
    changeDate(newDate)
    if(host)
      host.action()
  }
  
  /**
  * move the begin and end date to the previous period, it's depends the period type
  * after change the date period, it will call the host.action() to do something
  */
	this.previous = function() {
    console.log('previous')
    changeDateHandler(-1)  
  }

  /**
  * move the begin and end date to the next period, it's depends the period type
  * after change the date period, it will call the host.action() to do something
  */
  this.next = function() {
    console.log('next')
    changeDateHandler(1)  
  }   

  /**
  * get the period type
  * @return, String, it enum value is: 'day', 'week', 'month', 'year', 'total'
  */
  this.getPeriodType = function(){
    return periodType
  } 

  /**
  * get the begin time
  * @return, String, format is 'YYYY-MM-DD HH:mm:ss'
  */
  this.getBeginTime = function(){
    return beginTime
  }

  /**
  * get the end time
  * @return, String, format is 'YYYY-MM-DD HH:mm:ss'
  */
  this.getEndTime = function(){
    return endTime
  }

	/**
	* change the dateValue, beginTime, endTime by direction and periodType.
	* @direction, Number, enum -1, 1
	* if you want to move to previous date period, direction should be -1
	* if you want to move to next date period, direction should be 1
	*/
	function changeDateHandler(direction){
	  if(direction < 0){
	  	direction = -1
	  }else{
	  	direction = 1
	  }
    if (periodType == 'day') {        
      dateValue = moment(dateValue).add(1*direction, 'days').format('YYYY-MM-DD')        
      updateDayBeginEndQueryTime()        
    } else if (periodType == 'week') {
      dateValue = moment(dateValue).add(7*direction, 'days').format('YYYY-MM-DD')
      updateWeekBeginEndQueryTime()                         
    } else if (periodType == 'month') {
      dateValue = moment(dateValue).add(1*direction, 'months').format('YYYY-MM-DD')
      updateMonthBeginEndQueryTime()                         
    } else if (periodType == 'year') {
      dateValue = moment(dateValue).add(1*direction, 'years').format('YYYY-MM-DD')
      updateYearBeginEndQueryTime()                         
    }
  
    if(host)
      host.action()       
    console.log('changeDateHandler, beginTime: ' + beginTime + ', endTime: ' + endTime)
  }

  function updateDayBeginEndQueryTime(){
    beginTime = moment(dateValue).format('YYYY-MM-DD 00:00:00')
    endTime = moment(dateValue).format('YYYY-MM-DD 23:59:59')    
  }

  function updateWeekBeginEndQueryTime(){            
    beginTime = moment(dateValue).format('YYYY-MM-DD 00:00:00')
    var weekDateEnd = moment(dateValue).add(6, 'days').format('YYYY-MM-DD')
    endTime = moment(weekDateEnd).format('YYYY-MM-DD 23:59:59')
  }

  function updateMonthBeginEndQueryTime(){            
    beginTime = moment(dateValue).format('YYYY-MM-DD 00:00:00')
    endTime = moment(dateValue).add(1,'months').add(-1, 'seconds').format('YYYY-MM-DD HH:mm:ss')
  }

  function updateYearBeginEndQueryTime(){            
    beginTime = moment(dateValue).format('YYYY-MM-DD 00:00:00')
    endTime = moment(dateValue).add(1,'years').add(-1, 'seconds').format('YYYY-MM-DD HH:mm:ss')
  }

  function updateTotalBeginEndQueryTime(){            
    beginTime = moment().add(-7, 'years').format('YYYY-MM-DD 00:00:00')
    endTime = moment().format('YYYY-MM-DD HH:mm:ss')
  }
    /**
    * change dateValue to the specified tempDateValue, it will adjust the value by the periodType
    * eg. if periodType is 'week', than the dateValue will be set to the beginDate of the tempDateValue's week
    */ 
	function changeDate(newDate) {
    if (periodType == 'day') {
    	console.log('changeDate day')
      dateValue = moment(newDate).format('YYYY-MM-DD')
      updateDayBeginEndQueryTime()
    }else if(periodType == 'week'){
      console.log('changeDate week')
  		dateValue = getWeekBeginDate(new Date(moment(newDate)))
  		updateWeekBeginEndQueryTime()
	  }else if(periodType == 'month'){
	  	console.log('changeDate month')
  		dateValue = moment(newDate).format('YYYY-MM-01')
  		updateMonthBeginEndQueryTime()
	  }else if(periodType == 'year'){
	  	console.log('changeDate year')
  		dateValue = moment(newDate).format('YYYY-01-01')
  		updateYearBeginEndQueryTime()
    }
    else if(periodType == 'total'){
      console.log('changeDate total')
      dateValue = moment(newDate).format('YYYY-01-01')
      updateTotalBeginEndQueryTime()
	  }else{
	  	console.log('changeDate other, ' + periodType)
	  	periodType = 'day'
	  	updateDayBeginEndQueryTime()
	  }	 	  
    }
	/**
    * get the week's first day of the specific day
    * @theDate, Date
    * @return, String, it's format is 'YYYY-MM-DD', eg. 2016-08-26
    */
	function getWeekBeginDate(theDate){	
	  console.log('getWeekBeginDate, ' + theDate)
      var dayOffset = theDate.getDay()
      if (dayOffset === 0) {
        dayOffset = 7
      }      
      return moment(theDate).subtract(dayOffset - 1, 'days').format('YYYY-MM-DD')      
    }	
}
