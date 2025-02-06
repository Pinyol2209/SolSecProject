document.getElementById('tokenForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const tokenAddress = document.getElementById('tokenAddress').value;
    const resultsContent = document.getElementById('resultsContent');

    // Clear previous results
    resultsContent.innerHTML = '<p>Checking token...</p>';

    try {
        // Call the SDK to check the token
        const response = await fetch('/check-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tokenAddress }),
        });

        const result = await response.json();

        // Display results
        resultsContent.innerHTML = `
            <h3>Results for ${result.address}</h3>
            <p><strong>Name:</strong> ${result.metadata.name}</p>
            <p><strong>Symbol:</strong> ${result.metadata.symbol}</p>
            <p><strong>Rug Score:</strong> ${result.rugScore}</p>
            <p><strong>Is Rug Pull:</strong> ${result.isRug ? 'Yes' : 'No'}</p>
            <p><strong>Liquidity Locked:</strong> ${result.liquidity.isLiquidityLocked ? 'Yes' : 'No'}</p>
            <p><strong>Top Holders Percentage:</strong> ${result.holders.topHoldersPercentage}%</p>
        `;
    } catch (error) {
        resultsContent.innerHTML = `<p class="error">Error checking token: ${error.message}</p>`;
    }
}); 