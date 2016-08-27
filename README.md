# DatePeriodHandler

* tempPeriodType, String, enum: day, week, month, year, total
* host, Object, which should contain a function named action, has no param

# usage:

```javascript
  import DatePeriodHandler from 'DatePeriodHandler.js'
  var periodHandler = new DatePeriodHandler('day', this)
  periodHandler.next();
  queryData(periodHandler.getBeginTime(), periodHandler.getEndTime())
```
