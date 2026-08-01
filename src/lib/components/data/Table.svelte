<script lang="ts">
	type Row = {
		cells: string[];
	};

	type Props = {
		rows: Row[];
	};

	let { rows }: Props = $props();
</script>

<table class="table">
	<tbody>
		{#each rows as row, rowIndex (rowIndex)}
			<tr>
				{#each row.cells as cell, cellIndex (cellIndex)}
					<td>{cell}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
