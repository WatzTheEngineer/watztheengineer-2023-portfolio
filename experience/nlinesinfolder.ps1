dir . -filter "*.js" -Recurse -name | foreach{(GC $_).Count} | measure-object -sum
Start-Sleep -Seconds 10