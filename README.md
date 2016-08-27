# DatePeriodHandler

* tempPeriodType, String, enum: day, week, month, year, total
* host, Object, which should contain a function named action, has no param

# usage:

```javascript
  import TimePeriodHandler from 'TimePeriodHandler.js'
  var periodHandler = new TimePeriodHandler('day', this)
  periodHandler.next();
  queryData(periodHandler.getBeginTime(), periodHandler.getEndTime())
```
