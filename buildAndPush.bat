
dotnet publish -c Release

pushd bin\Release\netcoreapp2.0\publish

docker build -t meirkr/my_1st_angular:2.0 .
docker push meirkr/my_1st_angular:2.0

popd
