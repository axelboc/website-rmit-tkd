<?php

class Events extends Feature {
	
	private static $monthOptions = null;
	private static $yearOptions = null;
	private static $instance = null;
	
	
	/**
	 * Retrieve the events for a given month and year.
	 * @param {Integer} $m - the month number (no leading zero)
	 * @param {Integer} $y - the year
	 * @return {MongoLite\Cursor}
	 */
	public static function get($m, $y) {
		$events = self::getInstance()->collection->find([
			'month' => $m,
			'year' => $y
		])->toArray();

		return self::getInstance()->sortEvents($events);
	}
	
	/**
	 * Retrieve the events sorted by year and month.
	 * @return {Array}
	 */
	public static function getAll() {
		$events = self::getInstance()->collection->find()->toArray();
		return self::getInstance()->sortEvents($events);
	}
	
	/**
	 * Get the options with which to populate the drop-down menu of the 'evt-month' field.
	 * @return {Array}
	 */
	public static function getMonthOptions() {
		if (!self::$monthOptions) {
			self::$monthOptions = [];
			for ($i = 1; $i < 13; $i++) {
				self::$monthOptions[] = [
					'value' => $i,
					'label' => Helpers::monthToString($i)
				];
			}
		}
		
		return self::$monthOptions;
	}
	
	/**
	 * Get the options with which to populate the drop-down menu of the 'evt-year' field.
	 * @return {Array}
	 */
	public static function getYearOptions() {
		if (!self::$yearOptions) {
			self::$yearOptions = [];
			
			$year = date('Y') - 1;
			for ($i = 0; $i < 4; $i++) {
				self::$yearOptions[] = $year + $i;
			}
		}
		
		return self::$yearOptions;
	}
	
	/**
	 * Get instance.
	 * @return {Events}
	 */
	public static function getInstance() {
		if (self::$instance === null) {
			self::$instance = new static();
		}
		
		return self::$instance;
	}
	
	
	/**
	 * Add a new event.
	 */
	public function add() {
		// Process the fields
		$data = $this->processFields([
			'evt-label' => [
				'require' => 'Enter a label'
			],
			'evt-day' => [
				'require' => 'Enter a day',
				'validate' => [
					'/^([0-9]{1,2}(, [0-9]{1,2})*|[0-9]{1,2}\-[0-9]{1,2}|TBC)$/',
					'Enter a valid day (cf. instructions)'
				]
			],
			'evt-month' => [
				'require' => 'Enter a month',
				'validate' => ['/^(0?[1-9]|1[0-2])$/', 'Enter a valid month number']
			],
			'evt-year' => [
				'require' => 'Enter a year',
				'validate' => ['/^[0-9]{4}$/', 'Enter a valid year (yyyy)']
			]
		]);
		
		// Build event document
		$doc = [
			'label' => $data['evt-label'],
			'day' => $data['evt-day'],
			'month' => $data['evt-month'],
			'year' => $data['evt-year']
		];

		// Insert document in collection
		$res = $this->collection->insert($doc);

		// Conclude the action
		$this->conclude();
	}
	
	/**
	 * Remove an event.
	 */
	public function remove() {
		// Process GET parameter `id`
		$data = $this->processFields([
			'id' => FormSubmission::$fieldConfigs['special']
		], true);
		
		// Find event to remove
		$evt = $this->collection->findOne(['_id' => $data['id']]);
		
		// Fail if no event found with ID
		if (!$evt) {
			$this->formSubmission->exitWithResult(false, 'Unexpected error',
												  '[Events] no event found with id=' . $data['id']);
		}
		
		// Remove the event and conclude the action
		$this->collection->remove(['_id' => $data['id']]);
		$this->conclude();
	}
	
	/**
	 * Sort events by year, month and day.
	 * @param {Array} $events
	 * @return {Array}
	 */
	public function sortEvents($events) {
		usort($events, function ($a, $b) {
			// By year
			$yearDiff = $a['year'] - $b['year'];
			if ($yearDiff !== 0) {
				return $yearDiff;
			}
			
			// By month
			$monthDiff = $a['month'] - $b['month'];
			if ($monthDiff !== 0) {
				return $monthDiff;
			}
			
			// By day
			// Retrieve the first integer that make up the day string
			// If TBC, use an arbitrary large number so the event comes last
			preg_match('/^([0-9]{1,2}|TBC)/', $a['day'], $aMatches);
			preg_match('/^([0-9]{1,2}|TBC)/', $b['day'], $bMatches);
			$aDay = $aMatches[0] === 'TBC' ? 100 : intval($aMatches[0]);
			$bDay = $bMatches[0] === 'TBC' ? 100 : intval($bMatches[0]);
			return $aDay - $bDay;
		});
		
		return $events;
	}
	
}

?>
