<section class="admin-events section row">
	<h2 class="section-heading">Calendar events</h2>
	<div class="section-content lh">
		<div class="admin-help" hidden>
			<p>This section controls the events displayed in the calendar on the <a href="/">homepage</a>. Note that only six months are shown in the calendar: the current month, the month before and four months after. Follow these guidelines when adding a new event, and always double check your changes in the calendar:</p>
			<ul>
				<li>Write as concise a <strong>label</strong> as you can, as the space on the calendar is very limited. Use normal sentence case (e.g. <em>Black-belt grading</em>) but capitalise names when relevant (e.g. <em>RMIT Champs</em>).</li>
				<li>Enter the <strong>day</strong> in one of the formats below:
					<ul>
						<li>single number (e.g. &ldquo;<em>30</em>&rdquo;)</li>
						<li>list of numbers separated by commas (e.g. &ldquo;<em>1, 8, 15</em>&rdquo;)&mdash;for events that occur over multiple, non-consecutive days</li>
						<li>two numbers separated by a dash (e.g. &ldquo;<em>24-25</em>&rdquo;)&mdash;for events that occur over two or more consecutive days</li>
						<li>&ldquo;<em>TBC</em>&rdquo;&mdash;if the exact date is to be confirmed.</li>
					</ul>
				</li>
				<li>Do not add leading zeros to single-digit numbers in the day field (e.g. write &ldquo;<em>5</em>&rdquo;, not &ldquo;<em>05</em>&rdquo;).</li>
			</ul>
		</div>
		<form action="/core/forms/form-admin.php?feature=events&action=add" method="post">
			<?php Helpers::printResult('events', true); ?>
			<table class="admin-table">
				<thead>
					<tr>
						<th scope="col"><label for="evt-year">Year</label></th>
						<th scope="col"><label for="evt-month">Month</label></th>
						<th scope="col"><label for="evt-day">Day</label></th>
						<th scope="col"><label for="evt-label">Label</label></th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody class="links-inv"><?php 
					$events = Events::getAll();
					foreach ($events as $evt) {
						?>
						<tr>
							<td><?php echo $evt['year']; ?></td>
							<td><?php echo Helpers::monthToString($evt['month']); ?></td>
							<td><?php echo $evt['day']; ?></td>
							<td><?php echo $evt['label']; ?></td>
							<td>
								<a href="/core/forms/form-admin.php?feature=events&action=remove&id=<?php echo $evt['_id']; ?>" title="Remove event">[x]</a>
							</td>
						</tr>
						<?php
					} ?>
					<tr class="admin-row--add">
						<td>
							<select id="evt-year" name="evt-year" class="field field--select"><?php
								$selectedOpt = Helpers::getData('evt-year', date('Y'));
								Helpers::printOptions(Events::getYearOptions(), (int) $selectedOpt);
							?></select>
						</td>
						<td>
							<select id="evt-month" name="evt-month" class="field field--select"><?php
								$selectedOpt = Helpers::getData('evt-month', date('n'));
								Helpers::printOptions(Events::getMonthOptions(), (int) $selectedOpt);
							?></select>
						</td>
						<td><input id="evt-day" name="evt-day" class="field" type="text" value="<?php Helpers::printData('evt-day'); ?>" size="7" placeholder="1"></td>
						<td><input id="evt-label" name="evt-label" class="field" type="text" value="<?php Helpers::printData('evt-label'); ?>" size="30" placeholder="Colour-belt grading"></td>
						<td><button class="admin-btn button" type="submit">Add</button></td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
</section>