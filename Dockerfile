FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.csproj .
RUN dotnet restore

# copy and build everything else
COPY . .

RUN dotnet build


FROM build AS publish
RUN apt-get update
RUN apt-get install gnupg wget git unzip -y
RUN curl -sL https://deb.nodesource.com/setup_8.x |  bash -
RUN apt-get install nodejs -y
WORKDIR /app
RUN dotnet publish -c Release -o out

FROM microsoft/dotnet:2.1-runtime AS runtime
RUN apt-get update
RUN apt-get install gnupg wget git unzip -y
RUN curl -sL https://deb.nodesource.com/setup_8.x |  bash -
RUN apt-get install nodejs -y
WORKDIR /app
COPY --from=publish /app/out ./
RUN ls -l
ENTRYPOINT ["dotnet", "My1stAngular.dll"]
